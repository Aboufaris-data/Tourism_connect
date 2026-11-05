/**
 * Tourism Connect - Mock Data
 * Realistic Moroccan Tourism Data for Ain Asserdoun (Beni Mellal) and Ouzoud Waterfalls (Azilal)
 */

const TOURISM_DATA = {
  destinations: [
    {
      id: "ain-asserdoun",
      name: "Aïn Asserdoun",
      province: "Béni Mellal",
      region: "Béni Mellal-Khénifra",
      title: "La source émeraude et le château perché du Moyen Atlas",
      description: "Classée patrimoine national, la source karstique d'Aïn Asserdoun jaillit au pied des montagnes de Tazerkount. Ses somptueux jardins en gradins, ses oliveraies et le Borj Ras el-Aïn offrent une vue panoramique époustouflante sur la plaine du Tadla.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80"
      ],
      experiencesCount: 14,
      coordinates: { lat: 32.3275, lng: -6.3464 },
      altitude: "620 m",
      bestSeason: "Toute l'année (Printemps et Automne idéaux)"
    },
    {
      id: "ouzoud",
      name: "Cascades d’Ouzoud",
      province: "Azilal",
      region: "Béni Mellal-Khénifra",
      title: "Les chutes majestueuses de 110 mètres et leur canyon verdoyant",
      description: "Perle du Haut Atlas central marocain, Ouzoud dévoile d'impressionnantes cataractes de 110 mètres dévalant dans un canyon entouré de vieux moulins à blé traditionnels, d'oliveraies séculaires et de macaques de Barbarie sauvages.",
      image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
      ],
      experiencesCount: 19,
      coordinates: { lat: 32.0142, lng: -6.7189 },
      altitude: "1 060 m",
      bestSeason: "Toute l'année (Débit spectaculaire en mars-mai)"
    }
  ],

  categories: [
    {
      id: "hiking",
      name: "Randonnée & Trekking",
      icon: "compass",
      description: "Sentiers panoramiques, crêtes montagneuses et sentiers des falaises guidés en toute sécurité."
    },
    {
      id: "heritage",
      name: "Visites guidées & Patrimoine",
      icon: "landmark",
      description: "Histoire des forteresses, architecture berbère, légendes d'Aïn Asserdoun et moulins ancestraux."
    },
    {
      id: "nature",
      name: "Nature & Photographie",
      icon: "camera",
      description: "Observation ornithologique, faune des macaques de Barbarie, flore aromatique et spots photos dorés."
    },
    {
      id: "water",
      name: "Activités aquatiques encadrées",
      icon: "waves",
      description: "Navigation en barque traditionnelle au pied des cascades, traversée des gorges sous supervision stricte."
    }
  ],

  guides: [
    {
      id: "karim-benali",
      name: "Karim Benali",
      badgeNumber: "MA-AZ-2018-042",
      role: "Guide Professionnel Agréé d'Espaces Naturels",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Natif des contreforts de l'Atlas à Azilal, je parcours ces sentiers depuis mon enfance. Titulaire de la carte professionnelle officielle délivrée par le Ministère du Tourisme, j'accompagne randonneurs et familles pour leur faire vivre une immersion authentique et sécurisée dans la gorge d'Ouzoud.",
      yearsExperience: 12,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      specialties: ["Géologie de l'Atlas", "Sentiers méconnus d'Ouzoud", "Secourisme en montagne", "Faune sauvage"],
      destinations: ["ouzoud"],
      rating: 4.97,
      reviewsCount: 148,
      verified: true,
      phone: "+212 6 61 23 45 67",
      email: "karim.benali@tourismconnect.ma",
      pricingConfig: {
        currency: "MAD",
        groupTiers: [
          { min: 1, max: 1, pricePerPerson: 320, label: "1 voyageur (Privatif)" },
          { min: 2, max: 3, pricePerPerson: 220, label: "2 à 3 voyageurs" },
          { min: 4, max: 6, pricePerPerson: 160, label: "4 à 6 voyageurs" },
          { min: 7, max: 12, pricePerPerson: 120, label: "7 à 12 voyageurs (Grand groupe)" }
        ],
        ageRates: {
          adult: { factor: 1.0, minAge: 18, maxAge: 64, label: "Adulte (18-64 ans)" },
          senior: { factor: 0.85, minAge: 65, maxAge: 120, label: "Senior (65+ ans)" },
          teen: { factor: 0.65, minAge: 12, maxAge: 17, label: "Adolescent (12-17 ans)" },
          child: { factor: 0.35, minAge: 4, maxAge: 11, label: "Enfant (4-11 ans)" }
        }
      },
      gallery: [
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
      ]
    },
    {
      id: "salma-raissouni",
      name: "Salma Raissouni",
      badgeNumber: "MA-BM-2019-018",
      role: "Guide Officielle du Patrimoine & de la Culture",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Diplômée d'histoire et guide agréée de la région de Béni Mellal, je transmets avec passion la mémoire millénaire du Borj Ras el-Aïn, le secret de la source d'Aïn Asserdoun et les traditions des tribus environnantes. Mes visites allient conte, histoire vivante et dégustation locale.",
      yearsExperience: 8,
      languages: ["Français", "Arabe", "Espagnol", "Anglais"],
      specialties: ["Histoire de Béni Mellal", "Architecture des ksour", "Botanique et vergers", "Randonnée douce"],
      destinations: ["ain-asserdoun"],
      rating: 4.94,
      reviewsCount: 112,
      verified: true,
      phone: "+212 6 62 89 10 11",
      email: "salma.raissouni@tourismconnect.ma",
      pricingConfig: {
        currency: "MAD",
        groupTiers: [
          { min: 1, max: 1, pricePerPerson: 300, label: "1 voyageur (Solo)" },
          { min: 2, max: 3, pricePerPerson: 200, label: "2 à 3 voyageurs" },
          { min: 4, max: 6, pricePerPerson: 150, label: "4 à 6 voyageurs" },
          { min: 7, max: 10, pricePerPerson: 110, label: "7 à 10 voyageurs" }
        ],
        ageRates: {
          adult: { factor: 1.0, minAge: 18, maxAge: 64, label: "Adulte (18-64 ans)" },
          senior: { factor: 0.80, minAge: 65, maxAge: 120, label: "Senior (65+ ans)" },
          teen: { factor: 0.60, minAge: 12, maxAge: 17, label: "Adolescent (12-17 ans)" },
          child: { factor: 0.30, minAge: 3, maxAge: 11, label: "Enfant (3-11 ans)" }
        }
      },
      gallery: [
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80"
      ]
    },
    {
      id: "youssef-amellal",
      name: "Youssef Amellal",
      badgeNumber: "MA-AZ-2015-089",
      role: "Guide Agréé Spécialiste Haut Atlas & Eaux Vives",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "15 années à guider explorateurs, photographes et passionnés de nature sauvage. Instructeur de sécurité nautique douce et sauveteur breveté, j'organise les balades en barque et les approches des vasques d'Ouzoud dans le respect absolu de la nature et de la réglementation.",
      yearsExperience: 15,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      specialties: ["Activités nautiques encadrées", "Sécurité des cascades", "Photographie animalière", "Observation des macaques"],
      destinations: ["ouzoud"],
      rating: 4.98,
      reviewsCount: 234,
      verified: true,
      phone: "+212 6 63 44 55 66",
      email: "youssef.amellal@tourismconnect.ma",
      pricingConfig: {
        currency: "MAD",
        groupTiers: [
          { min: 1, max: 1, pricePerPerson: 350, label: "1 voyageur (Privatif VIP)" },
          { min: 2, max: 3, pricePerPerson: 240, label: "2 à 3 voyageurs" },
          { min: 4, max: 6, pricePerPerson: 175, label: "4 à 6 voyageurs" },
          { min: 7, max: 12, pricePerPerson: 130, label: "7 à 12 voyageurs" }
        ],
        ageRates: {
          adult: { factor: 1.0, minAge: 18, maxAge: 64, label: "Adulte (18-64 ans)" },
          senior: { factor: 0.85, minAge: 65, maxAge: 120, label: "Senior (65+ ans)" },
          teen: { factor: 0.70, minAge: 12, maxAge: 17, label: "Adolescent (12-17 ans)" },
          child: { factor: 0.40, minAge: 5, maxAge: 11, label: "Enfant (5-11 ans)" }
        }
      },
      gallery: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80"
      ]
    },
    {
      id: "fatima-zahra-berrada",
      name: "Fatima-Zahra Berrada",
      badgeNumber: "MA-BM-2021-033",
      role: "Guide Agréée Terroir & Randonnée Douce",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Passionnée par le patrimoine agricole et les oliveraies ancestrales de Béni Mellal. Mes randonnées sont conçues pour toute la famille, avec une approche ludique pour les enfants et une découverte approfondie de l'écosystème de la source d'Aïn Asserdoun.",
      yearsExperience: 6,
      languages: ["Français", "Arabe", "Espagnol"],
      specialties: ["Circuits familles", "Dégustation d'huile d'olive pure", "Sentiers botaniques", "Crépuscule au Borj"],
      destinations: ["ain-asserdoun"],
      rating: 4.91,
      reviewsCount: 78,
      verified: true,
      phone: "+212 6 64 77 88 99",
      email: "fatimazahra.b@tourismconnect.ma",
      pricingConfig: {
        currency: "MAD",
        groupTiers: [
          { min: 1, max: 1, pricePerPerson: 280, label: "1 voyageur (Privatif)" },
          { min: 2, max: 3, pricePerPerson: 190, label: "2 à 3 voyageurs" },
          { min: 4, max: 6, pricePerPerson: 140, label: "4 à 6 voyageurs" },
          { min: 7, max: 10, pricePerPerson: 100, label: "7 à 10 voyageurs" }
        ],
        ageRates: {
          adult: { factor: 1.0, minAge: 18, maxAge: 64, label: "Adulte (18-64 ans)" },
          senior: { factor: 0.80, minAge: 65, maxAge: 120, label: "Senior (65+ ans)" },
          teen: { factor: 0.60, minAge: 12, maxAge: 17, label: "Adolescent (12-17 ans)" },
          child: { factor: 0.30, minAge: 3, maxAge: 11, label: "Enfant (3-11 ans)" }
        }
      },
      gallery: [
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80"
      ]
    }
  ],

  activities: [
    {
      id: "ouzoud-cliff-hike",
      title: "Grande Traversée des Falaises & Canyon d'Ouzoud",
      destinationId: "ouzoud",
      destinationName: "Cascades d'Ouzoud · Azilal",
      categoryId: "hiking",
      categoryName: "Randonnée & Trekking",
      guideId: "karim-benali",
      alternateGuideIds: ["youssef-amellal"],
      coverImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Parcourez les crêtes secrètes dominant les chutes de 110m, traversez les gorges sauvages et découvrez les grottes naturelles de travertin avec un guide officiel de haute montagne.",
      fullDescription: "Une immersion complète hors des sentiers battus touristiques traditionnels. Menés par Karim Benali, guide agréé natif d'Azilal, vous débuterez sur le belvédère sommital avant de descendre par un sentier séculaire serpentant sous les oliviers sauvages. Vous traverserez le canyon de l'Oued Ouzoud, observerez les colonies protégées de macaques de Barbarie dans leur habitat préservé et admirerez l'arc-en-ciel permanent formé par les embruns sous la lumière matinale.\n\nL'itinéraire comprend des pauses commentées sur la géologie calcaire de l'Atlas, un arrêt thé à la menthe préparé au feu de bois dans un moulin ancestral et un retour le long des vasques émeraude.",
      startingPrice: 120,
      duration: "4h30",
      difficulty: "Modéré",
      difficultyTag: "moderate",
      groupSizeMax: 12,
      minAge: 8,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      rating: 4.96,
      reviewsCount: 124,
      meetingPoint: {
        title: "Place centrale des Cascades d'Ouzoud",
        details: "Devant le bureau d'information touristique d'Ouzoud (près de la borne kilométrique Azilal). Votre guide portera son badge officiel visible.",
        coordinates: "32.0142° N, 6.7189° W"
      },
      included: [
        "Guide professionnel officiel agréé par le Ministère du Tourisme",
        "Assurance responsabilité civile professionnelle",
        "Thé à la menthe traditionnel et pain berbère au miel de montagne",
        "Bâtons de randonnée télescopiques certifiés (sur demande)",
        "Trousse de premiers secours certifiée et géolocalisation"
      ],
      notIncluded: [
        "Transport privé vers Ouzoud (disponible en option sur devis)",
        "Repas de midi complet (recommandations de restaurants locaux fournies)",
        "Pourboires facultatifs laissés à l'appréciation des participants"
      ],
      whatToBring: [
        "Chaussures de marche ou baskets à semelles crantées",
        "Gourde d'eau (1,5 L minimum par personne)",
        "Protection solaire (chapeau, crème, lunettes)",
        "Veste coupe-vent légère pour les zones d'embruns",
        "Appareil photo ou smartphone avec batterie chargée"
      ],
      safetyInstructions: "Activité menée sous la stricte supervision d'un guide professionnel agréé. Les participants doivent respecter les consignes de distance par rapport aux bords des falaises. La baignade est strictement restreinte aux zones calmes désignées par le guide selon le débit du cours d'eau.",
      cancellationPolicy: "Annulation sans frais jusqu'à 48 heures avant le début de l'activité. Remboursement intégral garanti sans justification requise."
    },

    {
      id: "ain-asserdoun-heritage",
      title: "Visite Secrète des Jardins & Borj Ras El-Aïn",
      destinationId: "ain-asserdoun",
      destinationName: "Aïn Asserdoun · Béni Mellal",
      categoryId: "heritage",
      categoryName: "Visites guidées & Patrimoine",
      guideId: "salma-raissouni",
      alternateGuideIds: ["fatima-zahra-berrada"],
      coverImage: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Plongez dans l'histoire de la résurgence miraculeuse d'Aïn Asserdoun, gravissez le mythique Borj protecteur et explorez les terrasses andalouses avec une historienne locale agréée.",
      fullDescription: "Aïn Asserdoun (l'Œil du Mulet en amazigh) est bien plus qu'une source : c'est le cœur vital qui a nourri Béni Mellal depuis des siècles. Accompagnés par Salma Raissouni, historienne et guide agréée, vous découvrirez les mystères de la captation des eaux karstiques du massif de Tazerkount.\n\nVous cheminerez au milieu des bassins en cascades, des roses parfumées et des canaux d'irrigation traditionnels (seguia). La montée vers le Borj Ras el-Aïn, forteresse sentinelle couleur ocre juchée sur son promontoire rocheux, vous offrira un panorama grandiose à 360° sur toute la plaine du Tadla et les sommets de l'Atlas.\n\nVisite ponctuée de contes oraux du Moyen Atlas et d'une dégustation d'huile d'olive fraîche issue des vergers voisins.",
      startingPrice: 110,
      duration: "3h00",
      difficulty: "Facile",
      difficultyTag: "easy",
      groupSizeMax: 10,
      minAge: 4,
      languages: ["Français", "Arabe", "Espagnol", "Anglais"],
      rating: 4.95,
      reviewsCount: 98,
      meetingPoint: {
        title: "Entrée principale du Parc d'Aïn Asserdoun",
        details: "À côté du grand pavillon d'accueil et de la fontaine d'eau minérale. Parking gratuit disponible sur place.",
        coordinates: "32.3275° N, 6.3464° W"
      },
      included: [
        "Accompagnement par une guide officielle certifiée du patrimoine",
        "Accès commenté et anecdotes historiques exclusives du Borj Ras el-Aïn",
        "Dégustation d'huile d'olive locale médaillée avec pain traditionnel frais",
        "Livret pédagogique illustré offert aux familles et enfants",
        "Assurance assistance locale"
      ],
      notIncluded: [
        "Dépenses personnelles et souvenirs artisanaux",
        "Boissons gazeuses ou snacks industriels"
      ],
      whatToBring: [
        "Chaussures confortables pour la marche en escaliers",
        "Chapeau ou casquette pour les terrasses ensoleillées",
        "Appareil photo pour les panoramas sur la plaine du Tadla"
      ],
      safetyInstructions: "Circuit accessible à tous les âges (enfants et seniors bienvenus). Certains escaliers en pierre vers le Borj peuvent être glissants lorsqu'ils sont humides : maintien des rampes recommandé.",
      cancellationPolicy: "Annulation gratuite jusqu'à 24 heures avant l'activité. Prise en charge rapide du remboursement."
    },

    {
      id: "ouzoud-boat-safari",
      title: "Balade en Barque & Brume au Pied des Cascades",
      destinationId: "ouzoud",
      destinationName: "Cascades d'Ouzoud · Azilal",
      categoryId: "water",
      categoryName: "Activités aquatiques encadrées",
      guideId: "youssef-amellal",
      alternateGuideIds: ["karim-benali"],
      coverImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Approchez au plus près du fracas des eaux en barque artisanale en bois, encadré par un guide sauveteur agréé, avec arrêt photos dans le nuage d'embruns rafraîchissant.",
      fullDescription: "Ressentez la puissance brute de la nature marocaine au ras de l'eau. Encadré par Youssef Amellal, guide professionnel spécialisé et titulaire d'un brevet national de sécurité aquatique, vous embarquez à bord d'une barque traditionnelle en bois ornée de fleurs.\n\nVous voguerez sur le bassin inférieur de la cascade, là où la rivière prend une teinte émeraude envoûtante. Vous vous approcherez à distance sécurisée du rideau d'eau assourdissant de 110 mètres, ressentant le souffle d'air vivifiant et les embruns parfumés aux herbes de montagne.\n\nAprès la navigation, le guide vous mènera le long des rives secrètes du canyon pour une découverte commentée des moulins à farine du XVIIIe siècle encore en activité partielle.",
      startingPrice: 130,
      duration: "2h30",
      difficulty: "Facile",
      difficultyTag: "easy",
      groupSizeMax: 10,
      minAge: 5,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      rating: 4.98,
      reviewsCount: 167,
      meetingPoint: {
        title: "Embarcadère sud des Cascades d'Ouzoud",
        details: "Au bas des escaliers de la rive gauche, face à la terrasse des moulins. Le guide vous attendra avec l'équipement de sécurité.",
        coordinates: "32.0138° N, 6.7195° W"
      },
      included: [
        "Passage privatisé en barque traditionnelle avec batelier expérimenté",
        "Guide professionnel agréé pour l'encadrement et l'interprétation",
        "Gilets de sauvetage certifiés CE (adaptés adultes et enfants)",
        "Pochettes étanches pour smartphones et appareils photo",
        "Assurance sauvetage et responsabilité civile"
      ],
      notIncluded: [
        "Vêtements de rechange",
        "Chaussures d'eau personnelles"
      ],
      whatToBring: [
        "Vêtements séchant rapidement ou tenue de rechange",
        "Serviette légère",
        "Chaussures d'eau ou sandales antidérapantes",
        "Lunettes de soleil avec cordon de maintien"
      ],
      safetyInstructions: "Le port du gilet de sauvetage fourni est obligatoire pendant toute la durée de la navigation. L'embarquement et le débarquement sont strictement assistés par le guide. Activité susceptible d'adaptation en cas de crue exceptionnelle déclarée par les autorités hydrauliques.",
      cancellationPolicy: "Annulation intégrale gratuite en cas d'avis météo défavorable ou jusqu'à 48h à l'avance sans condition."
    },

    {
      id: "tazerkount-photo-trail",
      title: "Safari Photographique & Crêtes de Tazerkount",
      destinationId: "ain-asserdoun",
      destinationName: "Aïn Asserdoun · Béni Mellal",
      categoryId: "nature",
      categoryName: "Nature & Photographie",
      guideId: "fatima-zahra-berrada",
      alternateGuideIds: ["salma-raissouni"],
      coverImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Capturez la lumière dorée sur les falaises du Moyen Atlas, les rapaces royaux et les vergers d'amandiers en fleurs lors d'un atelier rando-photo guidé.",
      fullDescription: "Conçu pour les amateurs d'images et les amoureux de la nature, cet itinéraire vous emmène sur les sentiers méconnus de la montagne de Tazerkount qui surplombe Aïn Asserdoun.\n\nAccompagnés par Fatima-Zahra Berrada, guide et passionnée de flore marocaine, vous découvrirez les meilleurs angles de prise de vue pour photographier les cascades en pose longue, le relief tourmenté de l'Atlas et la vie pastorale locale. L'horaire est spécialement calibré pour profiter de la « Golden Hour » de fin d'après-midi, lorsque la pierre ocre du Borj s'illumine d'un rouge flamboyant.",
      startingPrice: 100,
      duration: "3h30",
      difficulty: "Modéré",
      difficultyTag: "moderate",
      groupSizeMax: 8,
      minAge: 10,
      languages: ["Français", "Arabe", "Espagnol"],
      rating: 4.90,
      reviewsCount: 64,
      meetingPoint: {
        title: "Esplanade supérieure du Borj Ras el-Aïn",
        details: "Rendez-vous sur le belvédère sommital, au pied de la muraille est.",
        coordinates: "32.3290° N, 6.3450° W"
      },
      included: [
        "Guide officielle locale experte en cadrage paysager",
        "Conseils techniques personnalisés (smartphone ou boîtier photo pro)",
        "Pause thé berbère sous les pins d'Alep",
        "Assurance excursion montagne"
      ],
      notIncluded: [
        "Matériel de prise de vue (trépied ou appareil photo non fournis)",
        "Transport personnel"
      ],
      whatToBring: [
        "Votre appareil photo ou smartphone avec objectif propre",
        "Chaussures de marche fermées",
        "Gourde 1L",
        "Petite polaire pour la tombée de la nuit en altitude"
      ],
      safetyInstructions: "Sentier de montagne bien tracé mais caillouteux. Ne pas s'écarter du tracé balisé par le guide.",
      cancellationPolicy: "Annulation gratuite jusqu'à 48h à l'avance."
    },

    {
      id: "ouzoud-mills-canyon",
      title: "Circuit des Anciens Moulins à Eau & Vallée d'Ouzoud",
      destinationId: "ouzoud",
      destinationName: "Cascades d'Ouzoud · Azilal",
      categoryId: "heritage",
      categoryName: "Visites guidées & Patrimoine",
      guideId: "karim-benali",
      alternateGuideIds: ["youssef-amellal"],
      coverImage: "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Rencontrez les meuniers traditionnels de l'Atlas, visitez les installations hydrauliques en bois vieilles de plusieurs siècles et dégustez un pain tajine au feu de bois.",
      fullDescription: "Saviez-vous que le nom 'Ouzoud' dérive du mot berbère signifiant 'action de moudre le grain' ? Bien avant d'être une attraction touristique mondiale, les chutes servaient d'énergie motrice pour faire tourner des dizaines de moulins hydrauliques en tuf calcaire.\n\nCette visite guidée patrimoniale vous fait pénétrer à l'intérieur de ces moulins toujours entretenus par des familles locales. Vous assisterez à la mouture du blé dur, comprendrez le système ingénieux d'aqueducs creusés dans la roche et dégusterez une galette chaude tout juste sortie du four traditionnel en terre cuite.",
      startingPrice: 120,
      duration: "3h00",
      difficulty: "Facile",
      difficultyTag: "easy",
      groupSizeMax: 10,
      minAge: 6,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      rating: 4.93,
      reviewsCount: 88,
      meetingPoint: {
        title: "Place des Moulins, Ouzoud",
        details: "Rive droite des cascades, devant le panneau historique des moulins.",
        coordinates: "32.0150° N, 6.7175° W"
      },
      included: [
        "Guide agréé certifié du Haut Atlas",
        "Droit de visite commentée des moulins à eau traditionnels",
        "Dégustation de pain traditionnel au feu de bois avec miel d'euphorbe",
        "Assurance excursion"
      ],
      notIncluded: [
        "Achat d'huile ou farine artisanale des meuniers"
      ],
      whatToBring: [
        "Chaussures avec bonne adhérence pour les pavés humides",
        "Vêtements légers et couvrants pour les ateliers traditionnels",
        "Monnaie en dirhams (MAD) si vous souhaitez acheter de la farine locale"
      ],
      safetyInstructions: "Mécanismes anciens en mouvement : écoute stricte des instructions du guide pour les enfants.",
      cancellationPolicy: "Annulation gratuite jusqu'à 48h à l'avance."
    },

    {
      id: "benimellal-sunset-trek",
      title: "Randonnée Crépusculaire sur les Crêtes de Béni Mellal",
      destinationId: "ain-asserdoun",
      destinationName: "Aïn Asserdoun · Béni Mellal",
      categoryId: "hiking",
      categoryName: "Randonnée & Trekking",
      guideId: "salma-raissouni",
      alternateGuideIds: ["fatima-zahra-berrada"],
      coverImage: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Prenez de la hauteur au départ des sources d'Aïn Asserdoun pour gravir les premiers contreforts calcaires et admirer le coucher de soleil s'étendre sur les palmiers et vergers.",
      fullDescription: "Une randonnée vivifiante en fin de journée qui vous élève au-dessus de la ville de Béni Mellal. En partant de la fraîcheur des canaux d'Aïn Asserdoun, nous montons par des sentiers pastoraux peu fréquentés où poussent le thym sauvage, le romarin et les genévriers rouges.\n\nArrivés sur la crête supérieure de Tazerkount, nous installons un campement éphémère pour savourer le spectacle du soleil embrasant l'horizon tandis que les lumières de la ville s'illuminent une à une. La descente se fait à la lueur des lampes frontales en toute sécurité sous la conduite experte de Salma.",
      startingPrice: 110,
      duration: "4h00",
      difficulty: "Modéré",
      difficultyTag: "moderate",
      groupSizeMax: 10,
      minAge: 10,
      languages: ["Français", "Arabe", "Espagnol"],
      rating: 4.97,
      reviewsCount: 72,
      meetingPoint: {
        title: "Portail haut d'Aïn Asserdoun",
        details: "À proximité du poste des gardes forestiers, parking supérieur.",
        coordinates: "32.3260° N, 6.3470° W"
      },
      included: [
        "Guide officielle de randonnée",
        "Prêt de lampes frontales professionnelles pour la descente nocturne",
        "Collation de fruits secs de l'Atlas et thé parfumé au romarin sauvage",
        "Assurance complète"
      ],
      notIncluded: [
        "Pique-nique dînatoire lourd"
      ],
      whatToBring: [
        "Bonnes chaussures de marche",
        "Veste coupe-vent chaude pour le sommet",
        "Gourde 1L minimum"
      ],
      safetyInstructions: "Lampe frontale fournie obligatoire pour la descente. Suivi rigoureux du groupe.",
      cancellationPolicy: "Annulation gratuite jusqu'à 48h."
    },

    {
      id: "ain-asserdoun-speleo",
      title: "Exploration des Grottes Karstiques & Sources de Tazerkount",
      destinationId: "ain-asserdoun",
      destinationName: "Aïn Asserdoun · Béni Mellal",
      categoryId: "nature",
      categoryName: "Nature & Photographie",
      guideId: "salma-raissouni",
      alternateGuideIds: ["fatima-zahra-berrada"],
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Pénétrez dans les cavités calcaires secrètes d'où jaillit l'eau pure d'Aïn Asserdoun. Une aventure géologique guidée avec équipement de spéléologie douce.",
      fullDescription: "Sous la roche majestueuse de Tazerkount dort un réseau souterrain karstique fascinant qui alimente la source intarissable d'Aïn Asserdoun. Accompagnés par Salma Raissouni, vous découvrirez les stalactites, les conduits naturels creusés par l'eau sur des millénaires et les galeries secrètes non accessibles au grand public.\n\nUne sortie passionnante mêlant géologie, histoire hydrologique et respect de l'environnement souterrain fragile.",
      startingPrice: 140,
      duration: "3h30",
      difficulty: "Modéré",
      difficultyTag: "moderate",
      groupSizeMax: 8,
      minAge: 10,
      languages: ["Français", "Arabe", "Espagnol"],
      rating: 4.96,
      reviewsCount: 42,
      meetingPoint: {
        title: "Pavillon géologique d'Aïn Asserdoun",
        details: "À l'entrée supérieure du parc de la source, près du panneau d'information hydrogéologique.",
        coordinates: "32.3280° N, 6.3458° W"
      },
      included: [
        "Guide officielle certifiée en environnement karstique",
        "Casques de sécurité spéléo avec lampes frontales étanches",
        "Assurance complète d'excursion",
        "Collation de fruits secs locaux et thé à la menthe"
      ],
      notIncluded: [
        "Bottes personnelles (sur-chaussures fournies)"
      ],
      whatToBring: [
        "Vêtements confortables ne craignant pas la poussière",
        "Chaussures fermées à semelles adhérentes",
        "Gourde 1L"
      ],
      safetyInstructions: "Casque fourni obligatoire à l'intérieur des cavités. Itinéraire de spéléologie d'initiation ne nécessitant pas de cordes.",
      cancellationPolicy: "Annulation gratuite jusqu'à 48h à l'avance."
    },

    {
      id: "ouzoud-canyon-adventure",
      title: "Descente du Grand Canyon & Baignade aux Vasques Émeraude",
      destinationId: "ouzoud",
      destinationName: "Cascades d'Ouzoud · Azilal",
      categoryId: "water",
      categoryName: "Activités aquatiques encadrées",
      guideId: "youssef-amellal",
      alternateGuideIds: ["karim-benali"],
      coverImage: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Randonnée aquatique sportive le long du canyon en aval des cascades avec sauts surveillés et baignade dans les piscines naturelles cristallines.",
      fullDescription: "Pour les aventuriers en quête de sensations rafraîchissantes ! Menés par Youssef Amellal, sauveteur breveté et guide agréé, vous descendrez la gorge sauvage en suivant les méandres de la rivière.\n\nVous traverserez des vasques d'eau émeraude, glisserez sur des toboggans naturels façonnés par le tuf et profiterez de zones de baignade préservées à l'écart des circuits touristiques denses.",
      startingPrice: 150,
      duration: "4h00",
      difficulty: "Modéré",
      difficultyTag: "moderate",
      groupSizeMax: 10,
      minAge: 12,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      rating: 4.99,
      reviewsCount: 110,
      meetingPoint: {
        title: "Passerelle aval du Canyon d'Ouzoud",
        details: "Rendez-vous au pont suspendu en bois reliant les deux rives de l'Oued Ouzoud.",
        coordinates: "32.0125° N, 6.7210° W"
      },
      included: [
        "Guide sauveteur aquatique professionnel agréé",
        "Gilets de sauvetage homologués et sacs étanches",
        "Trousse de secours nautique et liaisons radio",
        "Boisson fraîche locale et encas énergétique"
      ],
      notIncluded: [
        "Combinaison néoprène (non requise en saison chaude)",
        "Serviette de bain"
      ],
      whatToBring: [
        "Maillot de bain et serviette",
        "Chaussures aquatiques ou vieilles baskets fermées",
        "Cordon de lunettes et crème solaire biodégradable"
      ],
      safetyInstructions: "Savoir nager est requis. Suivre scrupuleusement les consignes de franchissement de vasque données par le guide.",
      cancellationPolicy: "Annulation intégrale gratuite jusqu'à 48h ou en cas d'avis météo hydrologique défavorable."
    },

    {
      id: "ain-asserdoun-terroir-olive",
      title: "Circuit aux Moulins d'Huile d'Olive & Terroir des Vergers du Tadla",
      destinationId: "ain-asserdoun",
      destinationName: "Aïn Asserdoun · Béni Mellal",
      categoryId: "heritage",
      categoryName: "Visites guidées & Patrimoine",
      guideId: "fatima-zahra-berrada",
      alternateGuideIds: ["salma-raissouni"],
      coverImage: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Promenade au cœur des oliveraies séculaires de Béni Mellal, visite d'une presse à huile traditionnelle et dégustation de pain chaud tafarnout.",
      fullDescription: "La région de Béni Mellal est réputée comme l'un des plus grands vergers oléicoles du Royaume. Fatima-Zahra Berrada vous ouvre les portes de domaines familiaux où la cueillette et le pressage se transmettent depuis des générations.\n\nVous observerez les meules de pierre en action, découvrirez les subtilités gustatives de l'huile d'olive Picholine marocaine et partagerez un goûter chaleureux avec les agriculteurs.",
      startingPrice: 90,
      duration: "2h30",
      difficulty: "Facile",
      difficultyTag: "easy",
      groupSizeMax: 12,
      minAge: 4,
      languages: ["Français", "Arabe", "Espagnol"],
      rating: 4.92,
      reviewsCount: 56,
      meetingPoint: {
        title: "Place des Oliviers d'Aïn Asserdoun",
        details: "Près du rond-point sud menant au Borj, devant le vieux pressoir historique exposé.",
        coordinates: "32.3255° N, 6.3485° W"
      },
      included: [
        "Guide officielle du terroir et de l'artisanat",
        "Atelier de dégustation commentée d'huiles d'olive médaillées",
        "Pain tafarnout chaud, olives marinées et thé vert de bienvenue",
        "Livret explicatif sur les bienfaits de l'olivier"
      ],
      notIncluded: [
        "Achat de bouteilles d'huile d'olive artisanale"
      ],
      whatToBring: [
        "Chapeau ou casquette",
        "Chaussures de marche confortables",
        "Appareil photo pour les arbres sculpturaux centenaires"
      ],
      safetyInstructions: "Visite très facile accessible en famille avec poussettes et pour les seniors.",
      cancellationPolicy: "Annulation gratuite jusqu'à 24h à l'avance."
    },

    {
      id: "ouzoud-monkeys-ecotrail",
      title: "Piste Écologique des Macaques de Barbarie Sauvages",
      destinationId: "ouzoud",
      destinationName: "Cascades d'Ouzoud · Azilal",
      categoryId: "nature",
      categoryName: "Nature & Photographie",
      guideId: "karim-benali",
      alternateGuideIds: ["youssef-amellal"],
      coverImage: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Observation éthique des singes magots dans leur habitat forestier naturel avec un guide naturaliste certifié de l'Atlas.",
      fullDescription: "Ouzoud abrite l'une des dernières colonies florissantes de Macaques de Barbarie (Macaca sylvanus), espèce protégée de primates de l'Atlas. Loin des zones où certains les nourrissent artificiellement, Karim Benali vous conduit sur les versants boisés préservés.\n\nVous observerez les interactions sociales, le jeu des jeunes singes dans les caroubiers et apprendrez comment les communautés locales œuvrent pour préserver cet écosystème unique.",
      startingPrice: 110,
      duration: "3h00",
      difficulty: "Facile",
      difficultyTag: "easy",
      groupSizeMax: 10,
      minAge: 5,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      rating: 4.95,
      reviewsCount: 84,
      meetingPoint: {
        title: "Belvédère de la Forêt des Pins, Ouzoud",
        details: "Sur le sentier amont dominant la rive gauche, à 300 mètres des cascades.",
        coordinates: "32.0160° N, 6.7160° W"
      },
      included: [
        "Guide naturaliste agréé spécialiste de la faune de l'Atlas",
        "Prêt de jumelles d'observation ornithologique et faunique",
        "Pause thé berbère aux herbes sauvages",
        "Assurance complète"
      ],
      notIncluded: [
        "Nourriture pour animaux (le nourrissage sauvage est strictement interdit)"
      ],
      whatToBring: [
        "Chaussures confortables",
        "Gourde 1L",
        "Téléobjectif ou zoom photo"
      ],
      safetyInstructions: "Conserver une distance respectueuse avec les animaux sauvages. Ne pas tenter de les caresser.",
      cancellationPolicy: "Annulation gratuite jusqu'à 48h à l'avance."
    },

    {
      id: "ain-asserdoun-night-lantern",
      title: "Visite Nocturne aux Lanternes & Contes au Borj Ras El-Aïn",
      destinationId: "ain-asserdoun",
      destinationName: "Aïn Asserdoun · Béni Mellal",
      categoryId: "heritage",
      categoryName: "Visites guidées & Patrimoine",
      guideId: "salma-raissouni",
      alternateGuideIds: ["fatima-zahra-berrada"],
      coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "À la lueur des lanternes en cuivre ciselé, grimpez au sommet du Borj illuminé pour écouter les légendes berbères et contempler les étoiles.",
      fullDescription: "Une expérience féerique dès le crépuscule. Lorsque les visiteurs de jour s'en vont, les jardins d'Aïn Asserdoun se parent d'une atmosphère magique. Munis de lanternes artisanales traditionnelles, nous montons vers le Borj Ras El-Aïn baigné de lumière dorée.\n\nAssis sur des tapis berbères au sommet du rempart, vous écouterez les contes ancestraux de la source et des tribus de l'Atlas tout en sirotant un thé infusé à la verveine fraîche.",
      startingPrice: 130,
      duration: "2h30",
      difficulty: "Facile",
      difficultyTag: "easy",
      groupSizeMax: 10,
      minAge: 6,
      languages: ["Français", "Arabe", "Espagnol"],
      rating: 4.98,
      reviewsCount: 65,
      meetingPoint: {
        title: "Fontaine centrale illuminée d'Aïn Asserdoun",
        details: "Rendez-vous à 20h00 devant le grand bassin d'eau de la source.",
        coordinates: "32.3275° N, 6.3464° W"
      },
      included: [
        "Guide officielle conteuse du patrimoine régional",
        "Prêt d'une lanterne traditionnelle par participant ou famille",
        "Cérémonie du thé berbère nocturne avec pâtisseries marocaines",
        "Accès exclusif sécurisé au belvédère supérieur"
      ],
      notIncluded: [
        "Dîner complet"
      ],
      whatToBring: [
        "Petite veste chaude pour la fraîcheur de la nuit",
        "Chaussures fermées stables pour les escaliers du Borj"
      ],
      safetyInstructions: "Éclairage des marches assuré par le guide. Escaliers en pierre bien sécurisés.",
      cancellationPolicy: "Annulation gratuite jusqu'à 24h à l'avance."
    },

    {
      id: "ouzoud-gorges-picnic",
      title: "Grande Randonnée des Gorges de l'Oued El Abid & Déjeuner Berbère",
      destinationId: "ouzoud",
      destinationName: "Cascades d'Ouzoud · Azilal",
      categoryId: "hiking",
      categoryName: "Randonnée & Trekking",
      guideId: "karim-benali",
      alternateGuideIds: ["youssef-amellal"],
      coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=900&q=80"
      ],
      shortDescription: "Trek d'une journée complète le long de la rivière tumultueuse, falaises vertigineuses et tajine traditionnel préparé au feu de bois chez l'habitant.",
      fullDescription: "Une grande boucle sportive et immersive reliant les cascades d'Ouzoud au spectaculaire canyon de l'Oued El Abid. Karim Benali vous guide à travers d'anciens sentiers de transhumance creusés dans les falaises rouges.\n\nÀ mi-parcours, nous serons accueillis dans un douar traditionnel pour déguster un tajine berbère aux légumes de montagne cuit lentement sur la braise de bois d'olivier, suivi d'un thé d'altitude revigorant.",
      startingPrice: 180,
      duration: "6h00",
      difficulty: "Modéré",
      difficultyTag: "moderate",
      groupSizeMax: 10,
      minAge: 12,
      languages: ["Français", "Arabe", "Anglais", "Tamazight"],
      rating: 4.97,
      reviewsCount: 92,
      meetingPoint: {
        title: "Place principale du Belvédère d'Ouzoud",
        details: "Départ à 08h30 précises devant le bureau des guides agréés.",
        coordinates: "32.0142° N, 6.7189° W"
      },
      included: [
        "Guide professionnel de haute montagne agréé par l'État",
        "Déjeuner tajine berbère complet avec salades et fruits frais chez l'habitant",
        "Thé à la menthe et eau de source fraîche",
        "Bâtons de randonnée et assurance montagne complète"
      ],
      notIncluded: [
        "Boissons gazeuses industrielles"
      ],
      whatToBring: [
        "Chaussures de randonnée montantes ou baskets de trail",
        "Sac à dos 20L avec gourde 1.5L",
        "Protection solaire complète (chapeau, crème, lunettes)",
        "Veste respirante coupe-vent"
      ],
      safetyInstructions: "Bonne condition physique requise pour 14 km de marche avec 450 m de dénivelé positif. Pauses régulières.",
      cancellationPolicy: "Annulation gratuite jusqu'à 48h à l'avance."
    }
  ],

  reviews: [
    {
      id: "rev-1",
      activityId: "ouzoud-cliff-hike",
      touristName: "Thomas & Élodie Laurent",
      touristAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      touristCountry: "France 🇫🇷",
      rating: 5,
      date: "14 Octobre 2026",
      comment: "Expérience inoubliable aux Cascades d'Ouzoud ! Karim Benali est un guide d'un professionnalisme exemplaire. Son badge officiel rassure tout de suite. Il nous a évité les rabatteurs et nous a fait découvrir des points de vue féeriques sans un seul touriste autour. Le thé au feu de bois dans le moulin reste gravé dans nos mémoires !",
      photos: [
        "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=400&q=80"
      ],
      helpfulCount: 24,
      verifiedBooking: true,
      tag: "Randonnée en couple"
    },
    {
      id: "rev-2",
      activityId: "ain-asserdoun-heritage",
      touristName: "Driss & Amina El Mansouri",
      touristAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      touristCountry: "Casablanca, Maroc 🇲🇦",
      rating: 5,
      date: "28 Septembre 2026",
      comment: "Nous pensions bien connaître Béni Mellal, mais Salma nous a complètement éblouis par son érudition et sa bienveillance. Nos deux enfants (7 et 11 ans) ont adoré le conte du Borj Ras el-Aïn et la tarification dégressive par âge a rendu cette sortie très avantageuse pour notre famille.",
      photos: [
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80"
      ],
      helpfulCount: 19,
      verifiedBooking: true,
      tag: "Sortie en famille"
    },
    {
      id: "rev-3",
      activityId: "ouzoud-boat-safari",
      touristName: "Marcus Schneider",
      touristAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      touristCountry: "Allemagne 🇩🇪",
      rating: 5,
      date: "05 Octobre 2026",
      comment: "Pure magic at the bottom of Ouzoud waterfalls! Youssef took care of every safety detail, providing quality life jackets for everyone. Getting close to the 110m cascade mist while feeling totally secure was the highlight of our 2-week Moroccan trip. Great booking platform with fair pricing!",
      photos: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80"
      ],
      helpfulCount: 31,
      verifiedBooking: true,
      tag: "Nature & Aventure"
    },
    {
      id: "rev-4",
      activityId: "tazerkount-photo-trail",
      touristName: "Sarah Alami",
      touristAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      touristCountry: "Rabat, Maroc 🇲🇦",
      rating: 5,
      date: "22 Octobre 2026",
      comment: "La lumière au crépuscule sur les montagnes de Tazerkount est sublime. Fatima-Zahra connaît chaque recoin et m'a aidée à régler mon reflex pour des prises de vue parfaites. Une organisation sans faille.",
      photos: [],
      helpfulCount: 12,
      verifiedBooking: true,
      tag: "Amateur de photographie"
    }
  ],

  // Mock Bookings list for tourist, guide, and admin dashboards
  mockBookings: [
    {
      id: "TC-2026-8841",
      activityId: "ouzoud-cliff-hike",
      activityTitle: "Grande Traversée des Falaises & Canyon d'Ouzoud",
      guideId: "karim-benali",
      guideName: "Karim Benali",
      touristName: "Sophie Martin",
      touristEmail: "sophie.martin@example.com",
      touristPhone: "+33 6 12 34 56 78",
      date: "2026-11-15",
      timeSlot: "09:00",
      participants: { adults: 2, teens: 1, children: 1, seniors: 0 },
      totalParticipants: 4,
      groupTierUnlocked: "4 à 6 voyageurs (160 MAD / adulte)",
      financials: {
        guideSubtotal: 472,
        platformFee: 47.2,
        totalPaid: 519.2,
        currency: "MAD"
      },
      status: "accepted", // pending | accepted | rejected | confirmed | completed | cancelled
      statusLabelFr: "Acceptée par le guide",
      paymentMethod: "Carte Bancaire CMI (Sandbox)",
      meetingPoint: "Place centrale des Cascades d'Ouzoud",
      createdAt: "2026-11-02T10:15:00Z"
    },
    {
      id: "TC-2026-8842",
      activityId: "ain-asserdoun-heritage",
      activityTitle: "Visite Secrète des Jardins & Borj Ras El-Aïn",
      guideId: "salma-raissouni",
      guideName: "Salma Raissouni",
      touristName: "Hamza Berrada",
      touristEmail: "hamza.berrada@example.ma",
      touristPhone: "+212 6 77 88 99 00",
      date: "2026-11-18",
      timeSlot: "14:30",
      participants: { adults: 2, teens: 0, children: 2, seniors: 1 },
      totalParticipants: 5,
      groupTierUnlocked: "4 à 6 voyageurs (150 MAD / adulte)",
      financials: {
        guideSubtotal: 510,
        platformFee: 51.0,
        totalPaid: 561.0,
        currency: "MAD"
      },
      status: "pending", // Guide needs to accept or decline!
      statusLabelFr: "En attente du guide",
      paymentMethod: "Paiement garanti sur place (Sandbox)",
      meetingPoint: "Entrée principale du Parc d'Aïn Asserdoun",
      createdAt: "2026-11-03T09:20:00Z"
    },
    {
      id: "TC-2026-8839",
      activityId: "ouzoud-boat-safari",
      activityTitle: "Balade en Barque & Brume au Pied des Cascades",
      guideId: "youssef-amellal",
      guideName: "Youssef Amellal",
      touristName: "Arthur Dupont",
      touristEmail: "arthur.dupont@example.com",
      touristPhone: "+33 6 45 78 90 12",
      date: "2026-10-28",
      timeSlot: "10:00",
      participants: { adults: 2, teens: 0, children: 0, seniors: 0 },
      totalParticipants: 2,
      groupTierUnlocked: "2 à 3 voyageurs (240 MAD / adulte)",
      financials: {
        guideSubtotal: 480,
        platformFee: 48.0,
        totalPaid: 528.0,
        currency: "MAD"
      },
      status: "completed",
      statusLabelFr: "Terminée & Notée",
      paymentMethod: "Carte Visa (Sandbox)",
      meetingPoint: "Embarcadère sud des Cascades d'Ouzoud",
      createdAt: "2026-10-25T14:00:00Z"
    }
  ],

  // Platform admin metrics
  adminMetrics: {
    totalBookings: 284,
    totalVolumeMAD: 124580,
    platformRevenueMAD: 12458,
    activeGuidesCount: 22,
    pendingGuideApplications: 3,
    commissionRatePercent: 10
  },

  pendingGuides: [
    {
      id: "guide-cand-1",
      name: "Tariq Idrissi",
      city: "Azilal",
      licenseNumber: "MA-AZ-2024-118",
      specialty: "Spéléologie et Canyon de l'Atlas",
      experience: "7 ans",
      status: "pending_review",
      documentsSubmitted: ["Carte d'État de Guide", "Casier Judiciaire", "Attestation Secourisme SAMU", "Assurance RC"]
    },
    {
      id: "guide-cand-2",
      name: "Meryem Chraibi",
      city: "Béni Mellal",
      licenseNumber: "MA-BM-2025-004",
      specialty: "Écotourisme et Agrotourisme des Oliveraies",
      experience: "5 ans",
      status: "pending_review",
      documentsSubmitted: ["Carte d'État de Guide", "Diplôme de Tourisme", "Assurance RC"]
    }
  ]
};

// Expose globally
window.TOURISM_DATA = TOURISM_DATA;
