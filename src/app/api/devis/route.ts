import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, phone, email, demande, message, origin } = body ?? {};

    if (!nom || !phone || !email || !demande || !origin) {
      return NextResponse.json(
        { error: 'Champs requis manquants.' },
        { status: 400 },
      );
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

    const subject = `Nouvelle demande de devis - ${origin === 'malgache' ? 'Malgache' : 'Étranger'}`;
    const senderAddress = process.env.SMTP_FROM || 'devis@axcel.mg';
    const recipientAddress = process.env.DEVIS_TO || 'contact@axcel.mg';
    const copiedIn = process.env.DEVIS_CC?.split(',').map((item) => item.trim()).filter(Boolean) ?? ['crm@axcel.mg'];
    const requestLabels: Record<string, string> = {
      'creation-individuelle': "Création d'entreprise individuelle",
      'creation-sarl-sarlu': 'Création société SARL / SARLU',
      'creation-ong-association': 'Création ONG et Association',
      domiciliation: 'Domiciliation',
      'location-salle-reunion': 'Location de salle de réunion',
      recrutement: 'Recrutement',
      'service-coursier': 'Service de coursier',
      'conseil-assistance': 'Conseil et assistance',
      other: 'Autres',
    };
    const formattedDemande = requestLabels[String(demande)] || String(demande);

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #152039;">
        <h2 style="margin-bottom: 12px;">Nouvelle demande de devis</h2>
        <p><strong>Nom :</strong> ${String(nom)}</p>
        <p><strong>Téléphone :</strong> ${String(phone)}</p>
        <p><strong>Email :</strong> ${String(email)}</p>
        <p><strong>Origine :</strong> ${origin === 'malgache' ? 'Malgache' : 'Étranger'}</p>
        <p><strong>Type de demande :</strong> ${formattedDemande}</p>
        <p><strong>Message :</strong></p>
        <p>${String(message || 'Aucun message fourni')}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `Axcel Company <${senderAddress}>`,
      to: recipientAddress,
      cc: copiedIn.length > 0 ? copiedIn : ['crm@axcel.mg'],
      replyTo: String(email),
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
