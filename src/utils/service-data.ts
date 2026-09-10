export interface TarifLigne {
  intitule: string;
  honoraires?: string;
  fraisAdministratifs?: string;
  total?: string;
  duree?: string;
}

export interface SousMenu {
  slug: string;
  titre: string;
  resume: string;
  lignes: TarifLigne[];
  note?: string;
}

export interface Menu {
  slug: string;
  titre: string;
  description: string;
  sousMenus: SousMenu[];
}

export const coursierRecuperationDiplome: Menu = {
  slug: "coursier-recuperation-diplome",
  titre: "Récupération diplôme, relevé de note, équivalence",
  description:
    "Retrait de diplômes, relevés de notes, attestations et équivalences auprès des établissements et institutions.",
  sousMenus: [
    {
      slug: "diplome-master",
      titre: "Diplôme Master",
      resume: "Retrait du diplôme original auprès de l'université.",
      lignes: [
        {
          intitule: "Diplôme Master",
          honoraires: "300 000 Ar",
          fraisAdministratifs: "à partir de 20 000 Ar",
          total: "320 000 Ar",
          duree: "Selon l'institut",
        },
      ],
    },
    {
      slug: "licence",
      titre: "Licence",
      resume: "Retrait du diplôme de licence.",
      lignes: [
        {
          intitule: "Licence",
          honoraires: "200 000 Ar",
          fraisAdministratifs: "à partir de 20 000 Ar",
          total: "220 000 Ar",
          duree: "Selon l'institut",
        },
      ],
    },
    {
      slug: "releve-de-notes-bacc",
      titre: "Relevé de notes BACC",
      resume: "Récupération du relevé de notes du Baccalauréat.",
      lignes: [
        {
          intitule: "Relevé de notes BACC",
          honoraires: "100 000 Ar",
          fraisAdministratifs: "à partir de 5 000 Ar",
          total: "105 000 Ar",
          duree: "10 jours ouvrables",
        },
      ],
    },
    {
      slug: "attestation-de-reussite",
      titre: "Attestation de réussite",
      resume: "Délivrance de l'attestation de réussite.",
      lignes: [
        {
          intitule: "Attestation de réussite",
          honoraires: "100 000 Ar",
          fraisAdministratifs: "à partir de 30 000 Ar",
          total: "130 000 Ar",
          duree: "30 jours ouvrables",
        },
      ],
    },
    {
      slug: "equivalence-fop",
      titre: "Équivalence FOP",
      resume: "Dossier d'équivalence de diplôme (FOP).",
      lignes: [
        {
          intitule: "Équivalence FOP",
          honoraires: "100 000 Ar",
          fraisAdministratifs: "10 000 Ar",
          total: "110 000 Ar",
          duree: "3 jours ouvrables",
        },
      ],
    },
    {
      slug: "bacc-faritra",
      titre: "BACC en faritra",
      resume: "Récupération du BACC obtenu en région.",
      lignes: [
        {
          intitule: "Antananarivo",
          honoraires: "200 000 Ar",
          fraisAdministratifs: "à partir de 30 000 Ar",
          duree: "1 mois",
        },
        {
          intitule: "Fianarantsoa / Toamasina",
          honoraires: "300 000 Ar",
          fraisAdministratifs: "Transport faritra : 15 000 Ar",
          duree: "1 mois",
        },
        {
          intitule: "Autre région",
          honoraires: "500 000 Ar",
          duree: "1 mois",
        },
      ],
    },
  ],
};

export const coursierRecuperationTraduction: Menu = {
  slug: "coursier-recuperation-traduction",
  titre: "Récupération / traduction acte de naissance, acte de mariage",
  description:
    "Retrait de copies d'actes d'état civil et traduction officielle auprès des services concernés.",
  sousMenus: [
    {
      slug: "traduction-acte-de-naissance",
      titre: "Traduction acte de naissance",
      resume: "Traduction officielle d'un acte de naissance.",
      lignes: [
        {
          intitule: "Traduction acte de naissance",
          honoraires: "50 000 Ar",
          fraisAdministratifs: "15 000 Ar / acte",
          total: "65 000 Ar",
          duree: "1 jour",
        },
      ],
    },
    {
      slug: "copie-acte-de-naissance",
      titre: "Récupération copie de naissance",
      resume: "Retrait d'une copie d'acte de naissance, Tana ou faritra.",
      lignes: [
        {
          intitule: "Antananarivo",
          honoraires: "30 000 Ar",
          fraisAdministratifs: "1 000 Ar / copie",
          duree: "3 jours ouvrables",
        },
        {
          intitule: "Faritra",
          honoraires: "300 000 Ar",
          fraisAdministratifs: "Transport faritra : 15 000 Ar",
          duree: "3 jours ouvrables",
        },
      ],
    },
    {
      slug: "acte-de-mariage",
      titre: "Acte de mariage",
      resume: "Retrait / traduction d'un acte de mariage.",
      lignes: [
        {
          intitule: "Acte de mariage",
          honoraires: "Sur devis",
        },
      ],
      note: "Tarif communiqué sur devis selon la commune de célébration.",
    },
  ],
};

export const coursierRecuperationCertificats: Menu = {
  slug: "coursier-recuperation-certificats",
  titre: "Récupération des certificats de mise en commerce",
  description:
    "Autorisation de mise en vente d'un produit alimentaire, agréé par le ministère du Commerce et de la Santé.",
  sousMenus: [
    {
      slug: "produits-alimentaires",
      titre: "Produits alimentaires",
      resume: "Droit de commerce et visa sanitaire, par produit.",
      lignes: [
        { intitule: "Dossier de base", honoraires: "300 000 Ar" },
        {
          intitule: "Droit de commerce",
          fraisAdministratifs: "120 000 Ar / produit",
        },
        {
          intitule: "Droit ministère de la Santé",
          fraisAdministratifs: "à partir de 60 000 Ar / produit",
        },
      ],
      note: "Durée de traitement : 3 semaines.",
    },
  ],
};

export const coursierRecuperationCertificatsConsommabilite: Menu = {
  slug: "coursier-recuperation-certificats-consommabilite",
  titre: "Récupération des certificats de consommabilité",
  description:
    "Certificat de consommabilité pour produits cosmétiques et assimilés.",
  sousMenus: [
    {
      slug: "produits-cosmetiques",
      titre: "Produits cosmétiques",
      resume: "Droit de commerce et visa sanitaire, par produit.",
      lignes: [
        { intitule: "Dossier de base", honoraires: "300 000 Ar" },
        {
          intitule: "Droit de commerce",
          fraisAdministratifs: "120 000 Ar / produit",
        },
        {
          intitule: "Droit ministère de la Santé",
          fraisAdministratifs: "50 000 Ar / produit",
        },
      ],
      note: "Durée de traitement : 3 semaines.",
    },
  ],
};

export const coursierToutesEnregistrementCertifications: Menu = {
  slug: "coursier-toutes-enregistrement-certifications",
  titre: "Toutes enregistrement, certifications",
  description:
    "Dépôts OMAPI, actes officiels, cartes et documents administratifs divers.",
  sousMenus: [
    {
      slug: "omapi-logo-nom-commercial",
      titre: "OMAPI — logo et nom commercial",
      resume: "Dépôt et enregistrement de logo ou nom commercial.",
      lignes: [
        {
          intitule: "Dossier + droit de recherche",
          honoraires: "300 000 Ar",
          fraisAdministratifs: "Droit de recherche : 30 000 Ar",
          total: "410 000 Ar",
          duree: "6 mois",
        },
        {
          intitule: "Droit d'enregistrement",
          fraisAdministratifs: "180 000 Ar",
        },
      ],
    },
    {
      slug: "rectification-cin",
      titre: "Rectification CIN",
      resume: "Correction d'informations sur la carte d'identité.",
      lignes: [
        {
          intitule: "Rectification CIN",
          honoraires: "300 000 Ar",
          fraisAdministratifs: "50 000 Ar",
          total: "350 000 Ar",
          duree: "1 mois",
        },
      ],
    },
    {
      slug: "mutation",
      titre: "Mutation",
      resume: "Dossier de mutation administrative.",
      lignes: [
        {
          intitule: "Mutation",
          honoraires: "1 000 000 Ar",
          fraisAdministratifs: "600 000 Ar",
          total: "1 600 000 Ar",
          duree: "1 mois",
        },
      ],
    },
    {
      slug: "carte-rose-carte-grise",
      titre: "Carte rose → carte grise",
      resume: "Changement de carte rose en carte grise véhicule.",
      lignes: [
        {
          intitule: "Changement carte rose / carte grise",
          honoraires: "600 000 Ar",
          total: "600 000 Ar",
          duree: "1 mois",
        },
      ],
    },
    {
      slug: "puce-operateur",
      titre: "Puce (3 opérateurs)",
      resume: "Achat / activation de puce, tous opérateurs.",
      lignes: [
        {
          intitule: "Puce (3 opérateurs)",
          honoraires: "100 000 Ar",
          total: "100 000 Ar",
          duree: "1 semaine",
        },
      ],
    },
    {
      slug: "bulletin-n3",
      titre: "Bulletin n°3",
      resume: "Retrait de bulletin(s) n°3, du casier judiciaire.",
      lignes: [
        {
          intitule: "1 bulletin",
          honoraires: "38 000 Ar",
          fraisAdministratifs: "2 000 Ar",
        },
        {
          intitule: "2 bulletins",
          honoraires: "46 000 Ar",
          fraisAdministratifs: "4 000 Ar",
        },
        {
          intitule: "3 bulletins",
          honoraires: "54 000 Ar",
          fraisAdministratifs: "6 000 Ar",
        },
      ],
    },
    {
      slug: "fiche-de-paie",
      titre: "Fiche de paie",
      resume: "Récupération de fiche(s) de paie.",
      lignes: [
        {
          intitule: "Fiche de paie",
          honoraires: "50 000 Ar / fiche",
          total: "50 000 Ar",
          duree: "3 jours ouvrables",
        },
      ],
    },
    {
      slug: "creation-compte-bancaire",
      titre: "Création compte bancaire",
      resume: "Ouverture de compte bancaire pour le compte du client.",
      lignes: [
        {
          intitule: "Création compte bancaire",
          honoraires: "100 000 Ar",
          total: "100 000 Ar",
          duree: "1 semaine",
        },
      ],
    },
  ],
};