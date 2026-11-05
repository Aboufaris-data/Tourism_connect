# Tourism Connect 🇲🇦 · Plateforme d'Expériences Touristiques & Guides Agréés

> **Prototype Frontend Moderne & Premium pour Hackathon Tourisme & Innovation**  
> Destiné à valoriser les guides touristiques officiellement agréés par l'État marocain dans la région de **Béni Mellal-Khénifra** :
> - **Aïn Asserdoun – Béni Mellal**
> - **Cascades d'Ouzoud – Azilal**

---

## 🌟 Présentation du Projet

**Tourism Connect** est une place de marché d'expériences touristiques authentiques (et non un site d'hôtels) qui connecte directement les voyageurs nationaux et internationaux avec des **guides professionnels officiellement agréés et assermentés** par le Ministère du Tourisme du Maroc.

### Points Clés du Projet
1. **100% Guides Agréés** : Présentation du numéro de carte professionnelle d'État, de l'assurance RC et du brevet de secourisme.
2. **Système de Tarification Dynamique Double** :
   - **Palier selon la taille du groupe** (Solo, 2–3 pers., 4–6 pers., 7–12 pers.).
   - **Réductions par tranche d'âge** (Adultes, Seniors, Adolescents, Enfants).
   - **Transparence totale** : 90% reversés directement au guide, 10% de frais plateforme clairement séparés.
3. **Validation Préalable du Guide** : Le guide valide ses disponibilités avant tout paiement. Aucun débit tant que la demande n'est pas acceptée.
4. **Multilingue avec Support RTL** : Français (par défaut), Arabe (العربية avec layout RTL natif), Anglais et Espagnol.
5. **Mode Démonstration Hackathon** : Simulateur de rôles (Touriste, Guide Agréé, Administrateur) et passerelle de paiement sandbox.

---

## 🚀 Démarrage Immédiat

Aucune installation ni dépendance requise ! Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur moderne (Chrome, Edge, Firefox, Safari) :

```bash
# Double-cliquez sur :
c:\Users\user\Desktop\Tourism Connect\index.html
```

---

## 🎨 Identité Visuelle & Design System

Le design sublime l'authenticité et la nature marocaine grâce à une palette terreuse et chaleureuse :
- **Typographie** :
  - Titres et Chiffres : `Bricolage Grotesque` (caractère affirmé, moderne et chaleureux).
  - Corps de texte et contrôles : `Manrope` (lisibilité optimale).
- **Palette de Couleurs Nature & Terre du Maroc (Coolors)** :
  - **Dark Moss Green** (`#283618`) : Titres principaux, en-têtes, gradient immersif du Hero, arrière-plan du footer (`--fix`) et contraste élevé (`--ink`).
  - **Dark Olive Green** (`#606C38`) : Nuances secondaires, tags de catégories, sous-titres et bordures douces (`--mute`).
  - **Cornsilk Warm Linen** (`#FEFAE0`) : Couleur de fond principale (`--paper`), cartes et bons d'échange.
  - **Earth Sandstone Ochre** (`#DDA15E`) : Badges de guides agréés, bannières de réductions débloquées et étoiles d'avis (`--saf`).
  - **Terracotta Clay** (`#BC6C25`) : Boutons d'action prioritaires CTA, sélections de dates et épingles cartographiques (`--accent`).
- **Composants clés** :
  - Cartes arrondies (`border-radius: 20px - 28px`), bordures subtiles (`#E1D9AF`).
  - Simulateur smartphone interactif intégré dans le Hero.
  - Ticket de décomposition tarifaire transparente.
  - Mode Sombre / Mode Clair instantané.
  - Support de l'Arabe avec inversion miroir automatique (`dir="rtl"`).

---

## 📋 Fonctionnalités Complètes

### 1. Navigation & En-tête
- Logo signature Tourism Connect (feuille/épingle en rotation à 45°).
- Liens rapides : Accueil, Explorer les activités, Destinations, Devenir Guide, À propos, Contact.
- Sélecteur de langue 4 langues : **FR**, **عربي (RTL)**, **EN**, **ES**.
- Bascule Thème Clair / Thème Sombre.
- **Sélecteur de rôle démo** : Touriste, Guide Agréé, Administrateur.
- Bouton d'action proéminent : « Explorer les expériences ».

### 2. Page d'Accueil & Hero
- Titre phare : *« Découvrez le Maroc au-delà de l'ordinaire »*.
- Sous-titre valorisant les guides agréés.
- Barre de recherche multicritère : Destination, Catégorie, Date, Nombre de participants.
- **Simulateur mobile interactif** (5 étapes : Choix de la destination, Guide agréé, Date & Participants, Accord & Décomposition transparente, Confirmation).
- Bloc de confiance jaune safran et ticket transparent (90% guide / 10% plateforme).

### 3. Destinations Phares
- **Aïn Asserdoun – Béni Mellal** : Source karstique émeraude, Borj Ras el-Aïn perché, jardins en terrasses, oliveraies séculaires (14 expériences).
- **Cascades d'Ouzoud – Azilal** : Chutes vertigineuses de 110m, moulins hydrauliques traditionnels, canyon luxuriant et macaques sauvages (19 expériences).

### 4. Catalogue des Activités Touristiques (Activities Explorer)
- Filtres par catégories :
  1. *Randonnée & Trekking*
  2. *Visites guidées & Patrimoine*
  3. *Nature & Photographie*
  4. *Activités aquatiques encadrées*
- Filtres avancés :
  - Destination (Toutes, Aïn Asserdoun, Ouzoud).
  - Curseur de budget (80 à 400 MAD/pers.).
  - Niveau de difficulté (Facile, Modéré, Sportif).
  - Langues parlées par le guide (Français, Arabe, Anglais, Espagnol, Amazigh).
  - Recherche textuelle par mots-clés en direct.
- Tri : Plus populaires, Mieux notées (⭐ 4.9+), Prix croissant, Prix décroissant, Plus récents.
- Fiches activités avec badge d'agrément du guide, note moyenne, avis, durée et prix plancher.

### 5. Fiche Détail de l'Activité
- Galerie photos haute résolution avec sélecteur de miniatures.
- Titre, badge officiel, note moyenne certifiée.
- Descriptif narratif et programme détaillé.
- Spécifications techniques (durée, difficulté, taille max du groupe, âge min).
- Point de rencontre exact avec coordonnées GPS et bouton d'itinéraire.
- Checklists interactives : Ce qui est inclus / Ce qui n'est pas inclus.
- Équipement à apporter et consignes strictes de sécurité.
- Politique d'annulation gratuite (48h).
- Profil du guide attitré avec accès direct à sa fiche complète.
- Section avis voyageurs vérifiés avec formulaire interactif « Laisser un avis ».

### 6. Système de Tarification Dynamique (Dynamic Pricing Calculator)
- **Calculateur interactif en direct** :
  - Sélection de la date et du créneau horaire.
  - Compteurs individuels par tranche d'âge : **Adultes (18-64 ans)**, **Seniors (65+ ans)**, **Adolescents (12-17 ans)**, **Enfants (3-11 ans)**.
  - Détection automatique du nombre total de participants et **déblocage en temps réel du palier de groupe** (ex: *Palier 4 à 6 personnes débloqué*).
  - Application de la tarification configurée par le guide sans double facturation.
  - Tableau de décomposition détaillée :
    - Sous-total part directe du guide.
    - Frais de service plateforme (10%) clairement séparés.
    - Économie estimée grâce au tarif de groupe.
    - Total final à régler en Dirhams marocains (MAD).
  - Bouton direct « Passer à la réservation ».

### 7. Profils des Guides Professionnels Agréés
- Photo de profil, nom complet, numéro officiel de licence (ex: `MA-AZ-2018-042`).
- Badge d'agrément ministériel bien visible.
- Biographie, années d'expérience terrain, langues maîtrisées, spécialités certifiées.
- Calendrier interactif des disponibilités (jours disponibles / réservés).
- Grille transparente des tarifs dégressifs appliqués par ce guide.
- Liste des activités encadrées par le guide avec réservation directe.

### 8. Tunnel de Réservation en 7 Étapes (Booking Flow)
1. Étape 1 : Activité sélectionnée.
2. Étape 2 : Date et horaire.
3. Étape 3 : Répartition des participants par catégorie d'âge.
4. Étape 4 : Calcul automatique du tarif.
5. Étape 5 : Sélection du guide (guide référent ou confrère agréé disponible).
6. Étape 6 : Coordonnées du voyageur (nom, e-mail, téléphone/WhatsApp, demandes spéciales).
7. Étape 7 : Paiement Sandbox (Carte CMI marocaine, Visa/Mastercard internationale, Paiement sur place au guide avec garantie).
8. Écran de confirmation : Numéro de référence (ex: `TC-2026-8850`), statut « En attente du guide », bouton pour voir dans le tableau de bord et bouton magique **« ⚡ Simuler l'acceptation instantanée par le guide »** !

### 9. Tableaux de Bord & Espaces Dédiés
- **Espace Voyageur** :
  - Liste des réservations avec pastilles de statut réactives (*En attente*, *Acceptée*, *Confirmée*, *Terminée*, *Annulée*).
  - Génération et affichage du **Bon d'échange officiel (Voucher)** avec QR code simulé et bouton d'impression.
  - Bouton d'annulation de demande en attente.
  - Bouton pour noter une sortie terminée.
- **Espace Guide Agréé** :
  - Boîte de réception des demandes avec boutons **[Accepter]** et **[Refuser]** qui mettent à jour l'état en temps réel !
  - Métriques d'activité (demandes en attente, sorties confirmées, revenus nets en MAD).
  - **Éditeur de règles tarifaires** : ajustement des prix par palier de groupe.
- **Espace Administrateur** :
  - File d'attente de vérification des licences des nouveaux guides (avec boutons **[Valider l'agrément]** et **[Rejeter]**).
  - Indicateurs clés (Nombre de réservations, Volume d'affaires en MAD, Revenus plateforme).
  - Curseur de réglage du taux de commission plateforme (de 5% à 15%).

### 10. Pages Supplémentaires
- **À propos** : Mission d'utilité publique, impact économique local, chiffres clés.
- **Devenir Guide** : Critères d'éligibilité, formulaire de candidature en ligne.
- **Contact** : Coordonnées des bureaux de Béni Mellal et Azilal, numéro d'urgence touristique 7j/7, formulaire de contact.

---

## 📁 Architecture du Code

```
Tourism Connect/
├── index.html            # Structure HTML5 sémantique, responsive et accessible
├── css/
│   └── styles.css        # Système de design tokens, thèmes clair/sombre, RTL, animations
├── js/
│   ├── data.js           # Données réalistes (destinations, activités, guides agréés, avis, réservations)
│   ├── i18n.js           # Dictionnaire multilingue complet (FR, AR RTL, EN, ES)
│   ├── calculator.js     # Moteur de tarification dynamique (Paliers groupe + Tranches d'âge)
│   └── app.js            # Contrôleur d'état, routage de vues, interactions et notifications
└── README.md             # Guide de présentation et documentation
```

---

## 🎤 Scénario Recommandé pour le Pitch Hackathon (3 à 5 minutes)

1. **Introduction (30s)** :
   - Montrez la page d'accueil avec le slogan *« Découvrez le Maroc au-delà de l'ordinaire »*.
   - Expliquez le problème : à Aïn Asserdoun et Ouzoud, les touristes tombent souvent sur des rabatteurs non qualifiés, alors que les guides officiels manquent d'un canal de réservation digital transparent.
2. **Recherche & Catalogue (1 min)** :
   - Utilisez la barre de recherche pour filtrer sur **Cascades d'Ouzoud**.
   - Montrez les filtres par catégorie (Randonnée, Activités aquatiques encadrées).
   - Cliquez sur une activité (ex: *Grande Traversée des Falaises d'Ouzoud*).
3. **Démonstration de la Tarification Dynamique (1 min)** :
   - Sur la fiche activité, ouvrez le panneau de droite.
   - Modifiez les participants : passez de 1 à 4 personnes (2 adultes, 1 ado, 1 enfant).
   - Montrez le badge qui s'allume : **« Palier 4 à 6 voyageurs actif »** avec le tarif dégressif et la décomposition claire (part du guide vs commission plateforme de 10%).
4. **Tunnel de Réservation & Profil Guide (1 min)** :
   - Cliquez sur « Passer à la réservation ».
   - Présentez les étapes jusqu'au paiement Sandbox.
   - Cliquez sur « ⚡ Simuler l'acceptation instantanée par le guide ».
5. **Bascules Multilingue & Espaces Rôles (30s)** :
   - Cliquez sur **« عربي »** dans le menu pour montrer l'inversion complète en RTL et la traduction arabe fluide.
   - Basculez le rôle démo sur **« Espace Guide Agréé »** pour montrer comment le guide accepte ses réservations et gère ses tarifs.
   - Basculez sur **« Espace Administrateur »** pour montrer la validation des cartes officielles.

