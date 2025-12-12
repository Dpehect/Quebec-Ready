import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      sidebar: {
        dashboard: "Dashboard",
        reports: "Audit Reports",
        scan: "Live Inspector",
        compliance: "Compliance Center",
        integrations: "Integrations",
        team: "Team & Roles",
        developers: "API & Devs",
        billing: "Billing & Invoices",
        settings: "Settings",
        logout: "Sign Out"
      },
      auth: {
        loginTitle: "Welcome Back",
        loginSubtitle: "Enter your credentials to access your workspace.",
        registerTitle: "Create Account",
        registerSubtitle: "Start your journey to full compliance.",
        email: "Email Address",
        pass: "Password",
        name: "Full Name",
        btn_login: "Sign In",
        btn_register: "Create Account",
        no_account: "Don't have an account?",
        have_account: "Already have an account?",
        link_register: "Sign up",
        link_login: "Sign in"
      },
      compliance: {
        title: "Bill 96 Compliance Tracker",
        subtitle: "Monitor your adherence to Quebec language laws across all channels.",
        status_compliant: "Compliant",
        status_risk: "At Risk",
        progress: "Progress",
        cats: {
          website: "Public Website & Marketing",
          contracts: "Contracts & Legal Documents",
          hiring: "Hiring & internal Comm.",
          signage: "Public Signage & Packaging"
        }
      }
      // ... (Diğer çeviriler öncekiyle aynı kalabilir)
    }
  },
  fr: {
    translation: {
      sidebar: {
        dashboard: "Tableau de bord",
        reports: "Rapports d'audit",
        scan: "Inspecteur Live",
        compliance: "Centre de Conformité",
        integrations: "Intégrations",
        team: "Équipe",
        developers: "API",
        billing: "Facturation",
        settings: "Paramètres",
        logout: "Déconnexion"
      },
      auth: {
        loginTitle: "Bon retour",
        loginSubtitle: "Entrez vos identifiants pour accéder.",
        registerTitle: "Créer un compte",
        registerSubtitle: "Commencez votre voyage vers la conformité.",
        email: "Adresse Email",
        pass: "Mot de passe",
        name: "Nom Complet",
        btn_login: "Se connecter",
        btn_register: "S'inscrire",
        no_account: "Pas de compte ?",
        have_account: "Déjà un compte ?",
        link_register: "S'inscrire",
        link_login: "Se connecter"
      },
      compliance: {
        title: "Suivi Conformité Loi 96",
        subtitle: "Surveillez votre adhésion aux lois linguistiques du Québec.",
        status_compliant: "Conforme",
        status_risk: "À Risque",
        progress: "Progrès",
        cats: {
          website: "Site Web Public & Marketing",
          contracts: "Contrats & Documents Légaux",
          hiring: "Embauche & Comm. Interne",
          signage: "Affichage Public & Emballage"
        }
      }
    }
  }
};

i18n.use(initReactI18next).init({ resources, lng: "en", interpolation: { escapeValue: false } });
export default i18n;