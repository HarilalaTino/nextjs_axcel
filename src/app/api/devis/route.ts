import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const ORIGIN_LABELS: Record<string, string> = {
  malgache: 'Malgache',
  etranger: 'Étranger',
  'non-specifie': 'Non spécifiée',
};

const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const toSingleLine = (value: unknown): string => String(value ?? '').replace(/[\r\n]+/g, ' ').trim();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, phone, whatsapp, email, demande, message, origin, domicilierAxcel, captchaToken } = body ?? {};

    if (!nom || !phone || !demande || !origin) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    if (!Object.prototype.hasOwnProperty.call(ORIGIN_LABELS, String(origin))) {
      return NextResponse.json({ error: 'Origine invalide.' }, { status: 400 });
    }

    if (!captchaToken) {
      return NextResponse.json({ error: 'Vérification captcha requise.' }, { status: 400 });
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY ?? '',
        response: String(captchaToken),
      }).toString(),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json({ error: 'Vérification captcha échouée' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            'Configuration SMTP incomplète. Vérifie SMTP_HOST, SMTP_USER et SMTP_PASS dans les variables d’environnement du serveur.',
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const originLabel = ORIGIN_LABELS[String(origin)];

    // `demande` arrive déjà traduit dans la langue du site (libellé du bouton choisi)
    const demandeLabel = toSingleLine(demande);
    const subject = `Nouvelle demande de devis - ${demandeLabel} (${originLabel})`;

    const senderAddress = process.env.SMTP_FROM || 'devis@axcel.mg';
    const recipientAddress = process.env.DEVIS_TO || 'contact@axcel.mg';
    const copiedIn = process.env.DEVIS_CC?.split(',').map((item) => item.trim()).filter(Boolean) ?? ['crm@axcel.mg'];

    const safeMessage = message
      ? escapeHtml(String(message).slice(0, 2000)).replace(/\r?\n/g, '<br />')
      : 'Aucun message fourni';

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #152039;">
        <h2 style="margin-bottom: 12px;">Nouvelle demande de devis</h2>
        <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
        ${whatsapp ? `<p><strong>WhatsApp :</strong> ${escapeHtml(whatsapp)}</p>` : ''}
        ${email ? `<p><strong>Email :</strong> ${escapeHtml(email)}</p>` : ''}
        <p><strong>Origine :</strong> ${escapeHtml(originLabel)}</p>
        <p><strong>Type de demande :</strong> ${escapeHtml(demandeLabel)}</p>
        <p><strong>Domicilier chez Axcel Company :</strong> ${domicilierAxcel ? 'Oui' : 'Non'}</p>
        <p><strong>Message :</strong></p>
        <p>${safeMessage}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `Axcel Company <${senderAddress}>`,
      to: recipientAddress,
      cc: copiedIn.length > 0 ? copiedIn : undefined,
      replyTo: email ? toSingleLine(email) : undefined,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi devis:', error);

    return NextResponse.json(
      {
        error:
          'Impossible d’envoyer la demande de devis pour le moment. Vérifiez la configuration SMTP et les identifiants.',
      },
      { status: 500 },
    );
  }
}
