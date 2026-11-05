/**
 * Tourism Connect - Dynamic Pricing Engine
 * Computes prices based on Group Size Tiers AND Age Categories as configured by each verified guide.
 */

const PricingCalculator = {
  DEFAULT_COMMISSION_PERCENT: 10,

  /**
   * Find the matching group tier for the total participant count
   */
  findGroupTier(guideConfig, totalParticipants) {
    if (!guideConfig || !guideConfig.groupTiers || !Array.isArray(guideConfig.groupTiers)) {
      return null;
    }

    return guideConfig.groupTiers.find(tier => 
      totalParticipants >= tier.min && totalParticipants <= tier.max
    ) || null;
  },

  /**
   * Main calculation method
   * @param {Object} guide - The selected guide object with pricingConfig
   * @param {Object} participants - { adults, teens, children, seniors }
   * @param {number} commissionPercent - Optional commission rate (defaults to 10%)
   * @returns {Object} Structured pricing calculation result
   */
  calculate(guide, participants, commissionPercent = 10) {
    const adults = Math.max(0, parseInt(participants.adults || 0, 10));
    const teens = Math.max(0, parseInt(participants.teens || 0, 10));
    const children = Math.max(0, parseInt(participants.children || 0, 10));
    const seniors = Math.max(0, parseInt(participants.seniors || 0, 10));

    const totalCount = adults + teens + children + seniors;

    if (totalCount === 0) {
      return {
        isValid: false,
        totalCount: 0,
        message: "Veuillez sélectionner au moins un participant pour calculer le tarif.",
        breakdown: [],
        guideSubtotal: 0,
        platformFee: 0,
        total: 0,
        currency: "MAD"
      };
    }

    if (!guide || !guide.pricingConfig) {
      return {
        isValid: false,
        totalCount,
        message: "Règle tarifaire introuvable pour ce guide. Veuillez contacter l'assistance.",
        breakdown: [],
        guideSubtotal: 0,
        platformFee: 0,
        total: 0,
        currency: "MAD"
      };
    }

    const { groupTiers, ageRates, currency = "MAD" } = guide.pricingConfig;

    // Match group size tier
    const activeTier = this.findGroupTier(guide.pricingConfig, totalCount);

    if (!activeTier) {
      const maxTier = groupTiers.reduce((max, t) => t.max > max ? t.max : max, 0);
      return {
        isValid: false,
        totalCount,
        message: totalCount > maxTier
          ? `Taille de groupe maximale dépassée (${totalCount} pers. > ${maxTier} pers. max autorisées par ce guide).`
          : "Aucun palier tarifaire configuré pour ce nombre de participants.",
        breakdown: [],
        guideSubtotal: 0,
        platformFee: 0,
        total: 0,
        currency
      };
    }

    const baseTierPrice = activeTier.pricePerPerson;
    const breakdown = [];
    let guideSubtotal = 0;

    // 1. Adults
    if (adults > 0) {
      const factor = ageRates?.adult?.factor ?? 1.0;
      const unitPrice = Math.round(baseTierPrice * factor);
      const lineTotal = unitPrice * adults;
      guideSubtotal += lineTotal;
      breakdown.push({
        categoryKey: "adult",
        label: ageRates?.adult?.label || "Adultes (18-64 ans)",
        count: adults,
        unitPrice,
        lineTotal,
        discountNote: factor < 1.0 ? `-${Math.round((1 - factor) * 100)}%` : null
      });
    }

    // 2. Seniors
    if (seniors > 0) {
      const factor = ageRates?.senior?.factor ?? 0.85;
      const unitPrice = Math.round(baseTierPrice * factor);
      const lineTotal = unitPrice * seniors;
      guideSubtotal += lineTotal;
      breakdown.push({
        categoryKey: "senior",
        label: ageRates?.senior?.label || "Seniors (65+ ans)",
        count: seniors,
        unitPrice,
        lineTotal,
        discountNote: `-${Math.round((1 - factor) * 100)}%`
      });
    }

    // 3. Teenagers
    if (teens > 0) {
      const factor = ageRates?.teen?.factor ?? 0.65;
      const unitPrice = Math.round(baseTierPrice * factor);
      const lineTotal = unitPrice * teens;
      guideSubtotal += lineTotal;
      breakdown.push({
        categoryKey: "teen",
        label: ageRates?.teen?.label || "Adolescents (12-17 ans)",
        count: teens,
        unitPrice,
        lineTotal,
        discountNote: `-${Math.round((1 - factor) * 100)}%`
      });
    }

    // 4. Children
    if (children > 0) {
      const factor = ageRates?.child?.factor ?? 0.35;
      const unitPrice = Math.round(baseTierPrice * factor);
      const lineTotal = unitPrice * children;
      guideSubtotal += lineTotal;
      breakdown.push({
        categoryKey: "child",
        label: ageRates?.child?.label || "Enfants (3-11 ans)",
        count: children,
        unitPrice,
        lineTotal,
        discountNote: `-${Math.round((1 - factor) * 100)}%`
      });
    }

    // Platform commission (10% standard, clearly separate)
    const commissionRate = (commissionPercent || 10) / 100;
    const platformFee = Math.round(guideSubtotal * commissionRate);
    const total = guideSubtotal + platformFee;

    // Calculate savings compared to single private base price
    const singleSoloPrice = groupTiers[0]?.pricePerPerson || baseTierPrice;
    const theoreticalSoloTotal = singleSoloPrice * totalCount;
    const estimatedSavings = Math.max(0, theoreticalSoloTotal - guideSubtotal);

    return {
      isValid: true,
      totalCount,
      activeTier,
      breakdown,
      baseTierPrice,
      guideSubtotal,
      platformFee,
      commissionPercent,
      total,
      currency,
      estimatedSavings,
      tierExplanation: `Palier ${activeTier.label} : tarif de base ${baseTierPrice} ${currency}/pers. appliqué avec réductions d'âge combinées.`
    };
  }
};

window.PricingCalculator = PricingCalculator;

