export interface BiddingFormField {
  key: string;
  label: string;
  defaultValue: string;
  placeholder: string;
}

export interface BiddingFormTemplate {
  id: string;
  category: 'letter-of-bid' | 'joint-venture' | 'banking-guarantee' | 'bidder-letters' | 'review-appeal' | 'goods-services';
  categoryNepali: string;
  titleNepali: string;
  titleEnglish: string;
  sbdSection: string;
  legalReference: string;
  description: string;
  applicableMethods: string[];
  fields: BiddingFormField[];
  contentTemplate: (params: Record<string, string>) => string;
}

export const BIDDING_FORMS_CATEGORIES = [
  { id: 'all', label: 'सबै फारामहरू' },
  { id: 'letter-of-bid', label: 'बोलपत्र पेश गर्ने पत्रहरू (Letter of Bid)' },
  { id: 'joint-venture', label: 'संयुक्त उपक्रम (JV) र अख्तियारी' },
  { id: 'banking-guarantee', label: 'बैंक जमानत तथा ऋण सुविधा (FIN-5)' },
  { id: 'goods-services', label: 'मालसामान, क्याटलग र सेवा खरिद (Goods & Services)' },
  { id: 'bidder-letters', label: 'प्रि-बिड, संशोधन तथा सहमति पत्रहरू' },
  { id: 'review-appeal', label: 'पुनरावलोकन तथा उजुरी (दफा ४७/४९)' },
] as const;

export const BIDDING_FORM_TEMPLATES: BiddingFormTemplate[] = [
  // 1. प्राविधिक बोलपत्र पेश गर्ने पत्र (Letter of Technical Bid)
  {
    id: 'form-tech-bid-letter',
    category: 'letter-of-bid',
    categoryNepali: 'बोलपत्र पेश गर्ने पत्रहरू',
    titleNepali: 'प्राविधिक बोलपत्र पेश गर्ने पत्र (Letter of Technical Bid)',
    titleEnglish: 'Letter of Technical Bid - Section IV',
    sbdSection: 'SBD Section IV: Bidding Forms (1S2E & NCB Works/Goods)',
    legalReference: 'सार्वजनिक खरिद ऐन दफा १४ र खरिद नियमावली नियम ३१ख',
    description: 'दुई खाम (1S2E) वा खुला बोलपत्र प्रक्रियामा प्राविधिक खामभित्र अनिवार्य रूपमा संलग्न गर्नुपर्ने आधिकारिक बोलपत्र पत्र।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालयको नाम' },
      { key: 'entityAddress', label: 'कार्यालयको ठेगाना', defaultValue: 'बबरमहल, काठमाडौँ', placeholder: 'ठेगाना' },
      { key: 'contractNo', label: 'बोलपत्र/ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'projectName', label: 'कामको विवरण/आयोजना', defaultValue: 'प्रशासकीय भवन तथा सडक स्तरोन्नति निर्माण कार्य', placeholder: 'आयोजनाको नाम' },
      { key: 'bidderName', label: 'बोलपत्रदाता (फर्म/कम्पनी)', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'फर्म/कम्पनीको नाम' },
      { key: 'bidderAddress', label: 'बोलपत्रदाताको ठेगाना', defaultValue: 'काठमाडौँ-१०, नेपाल', placeholder: 'ठेगाना' },
      { key: 'authorizedPerson', label: 'अधिकृत व्यक्तिको नाम र पद', defaultValue: 'रामचन्द्र श्रेष्ठ, प्रबन्ध निर्देशक', placeholder: 'नाम र पद' },
      { key: 'validityDays', label: 'बोलपत्र मान्य अवधि (दिन)', defaultValue: '९०', placeholder: 'दिन' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् खरिद अधिकृत / कार्यालय प्रमुखज्यू,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}
${p.entityAddress || '[कार्यालयको ठेगाना]'}।

विषय: प्राविधिक बोलपत्र पेश गरिएको सम्बन्धमा।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'}, काम: ${p.projectName || '[कामको विवरण]'})

महोदय,
१. हामी, निम्न हस्ताक्षरकर्ता, माथि उल्लिखित ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को ${p.projectName || '[कामको विवरण]'} निर्माण/आपूर्ति कार्यका लागि जारी गरिएको बोलपत्र कागजात र सो सम्बन्धी जारी भएका सम्पूर्ण संशोधनहरू (Addenda) ध्यानपूर्वक अध्ययन गरी सो बमोजिम कार्य गर्न मञ्जुर भई यो प्राविधिक बोलपत्र पेश गर्दछौँ।

२. हाम्रो बोलपत्र बोलपत्र कागजातमा तोकिएको अन्तिम मितिदेखि कम्तीमा ${p.validityDays || '९०'} दिनसम्म मान्य (Valid) रहनेछ र उक्त अवधिभित्र कार्यालयबाट स्वीकृत भएमा हामीलाई बाध्यकारी हुनेछ।

३. हामी प्रमाणित गर्दछौँ कि:
   क) हामी सार्वजनिक खरिद ऐन, २०६३ को दफा १० तथा बोलपत्र कागजातको ITB Clause बमोजिम बोलपत्रमा भाग लिन पूर्ण रूपमा योग्य छौँ।
   ख) हाम्रो फर्म/कम्पनी सार्वजनिक खरिद अनुगमन कार्यालय (PPMO) को कालोसूचीमा परेको छैन।
   ग) यस खरिद प्रक्रियामा हाम्रो कुनै स्वार्थ बाझिएको (Conflict of Interest) छैन।
   घ) खरिद नियमावली, २०६४ को नियम ६५(४घ) बमोजिम हाम्रो नाममा नेपालभर ५ (पाँच) वटा भन्दा बढी चालू खरिद सम्झौताहरू नरहेको व्यहोरा समेत प्रमाणित गर्दछौँ।

४. हामीले यस प्राविधिक बोलपत्रसँगै बोलपत्र कागजातले माग गरे बमोजिमको बोलपत्र जमानत (Bid Security), योग्यता सम्बन्धी सम्पूर्ण कागजात, फर्म/कम्पनी दर्ता, भ्याट दर्ता, पछिल्लो आर्थिक वर्षको कर चुक्ता प्रमाणपत्र, र अन्य आवश्यक विवरणहरू रितपूर्वक संलग्न गरेका छौँ।

५. हाम्रो आर्थिक बोलपत्र (Price Bid) अलग सिलबन्दी/इलेक्ट्रोनिक खाममा छुट्टै पेश गरिएको छ।

भवदीय,

हस्ताक्षर: _______________________
अधिकृत प्रतिनिधिको नाम: ${p.authorizedPerson || '[अधिकृत व्यक्तिको नाम]'}
फर्म/कम्पनीको नाम: ${p.bidderName || '[फर्म/कम्पनीको नाम]'}
ठेगाना: ${p.bidderAddress || '[ठेगाना]'}
सम्पर्क फोन / मोबाइल: [फोन नं.]
ईमेल: [ईमेल ठेगाना]
(फर्म/कम्पनीको छाप)`,
  },

  // 2. आर्थिक बोलपत्र पेश गर्ने पत्र (Letter of Price Bid)
  {
    id: 'form-price-bid-letter',
    category: 'letter-of-bid',
    categoryNepali: 'बोलपत्र पेश गर्ने पत्रहरू',
    titleNepali: 'आर्थिक बोलपत्र पेश गर्ने पत्र (Letter of Price Bid)',
    titleEnglish: 'Letter of Price Bid - Section IV',
    sbdSection: 'SBD Section IV: Bidding Forms (Envelope 2 - Price Bid)',
    legalReference: 'सार्वजनिक खरिद ऐन दफा १४ र नियमावली नियम ३१ख',
    description: 'दुई खाम (1S2E) वा खुला बोलपत्रको आर्थिक प्रस्ताव (Financial Proposal/BOQ) खाममा राख्नुपर्ने कबुल रकमसहितको आधिकारिक पत्र।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालयको नाम' },
      { key: 'contractNo', label: 'बोलपत्र/ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'projectName', label: 'कामको विवरण/आयोजना', defaultValue: 'प्रशासकीय भवन तथा सडक स्तरोन्नति निर्माण कार्य', placeholder: 'आयोजनाको नाम' },
      { key: 'bidderName', label: 'बोलपत्रदाता (फर्म/कम्पनी)', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'फर्म/कम्पनीको नाम' },
      { key: 'bidAmountWithoutVat', label: 'कबुल रकम (भ्याट बाहेक)', defaultValue: 'रु २,६५,५०,०००/-', placeholder: 'अंकमा रकम' },
      { key: 'bidAmountInWords', label: 'कबुल रकम (अक्षरमा)', defaultValue: 'दुई करोड पैँसट्ठी लाख पचास हजार रुपैयाँ मात्र', placeholder: 'अक्षरमा रकम' },
      { key: 'discountPercent', label: 'छुट प्रस्ताव (यदि भए)', defaultValue: 'कुनै छुट छैन (अथवा २%)', placeholder: 'छुट विवरण' },
      { key: 'authorizedPerson', label: 'अधिकृत व्यक्तिको नाम र पद', defaultValue: 'रामचन्द्र श्रेष्ठ, प्रबन्ध निर्देशक', placeholder: 'नाम र पद' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् खरिद अधिकृत / कार्यालय प्रमुखज्यू,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}।

विषय: आर्थिक बोलपत्र (Price Bid) पेश गरिएको सम्बन्धमा।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'}, काम: ${p.projectName || '[कामको विवरण]'})

महोदय,
१. हामी, निम्न हस्ताक्षरकर्ता, माथि उल्लिखित ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को ${p.projectName || '[कामको विवरण]'} कार्यका लागि बोलपत्र कागजातको अधीनमा रही मूल्य अभिवृद्धि कर (VAT) बाहेक तपशिल बमोजिमको रकममा उक्त कार्य सम्पन्न गर्न मञ्जुर भई यो आर्थिक बोलपत्र पेश गर्दछौँ:

   कुल कबुल रकम (भ्याट बाहेक): ${p.bidAmountWithoutVat || '[अंकमा रकम]'}
   (अक्षरमा: ${p.bidAmountInWords || '[अक्षरमा रकम]'})
   छुट सम्बन्धी विवरण (Discount): ${p.discountPercent || 'कुनै छुट प्रस्ताव गरिएको छैन।'}

२. मूल्य अभिवृद्धि कर (VAT १३%) नियमानुसार थप गरी बिल अनुसार भुक्तानी दाबी गरिनेछ।

३. हामीले दर विश्लेषण तथा बिल अफ क्वान्टिटिज (BOQ) मा उल्लेखित सम्पूर्ण आइटमहरूमा दररेट (Rates) अङ्क र अक्षर दुवैमा स्पष्ट रूपमा भरेका छौँ।

४. हाम्रो यो आर्थिक बोलपत्र बोलपत्र पेश गर्ने अन्तिम मितिदेखि तोकिएको मान्य अवधिसम्म कायम रहनेछ र सो अवधिभित्र हामीलाई बाध्यकारी हुनेछ। यदि हाम्रो बोलपत्र स्वीकृत भएमा तोकिएको म्यादभित्र कार्यसम्पादन जमानत (Performance Security) पेश गरी ठेक्का सम्झौता गर्न हामी पूर्ण रूपमा प्रतिबद्ध छौँ।

भवदीय,

हस्ताक्षर: _______________________
अधिकृत प्रतिनिधिको नाम: ${p.authorizedPerson || '[अधिकृत व्यक्तिको नाम]'}
फर्म/कम्पनीको नाम: ${p.bidderName || '[फर्म/कम्पनीको नाम]'}
(फर्म/कम्पनीको छाप)`,
  },

  // 3. सिलबन्दी दरभाउपत्र फाराम (Sealed Quotation Form)
  {
    id: 'form-sq-submission',
    category: 'letter-of-bid',
    categoryNepali: 'बोलपत्र पेश गर्ने पत्रहरू',
    titleNepali: 'सिलबन्दी दरभाउपत्र पेश गर्ने फाराम (Sealed Quotation Form)',
    titleEnglish: 'Sealed Quotation Submission Form',
    sbdSection: 'SBD Sealed Quotation (SQ Works/Goods)',
    legalReference: 'सार्वजनिक खरिद ऐन दफा ४० र खरिद नियमावली नियम ८४-८७',
    description: 'रु २० लाखसम्मको मालसामान वा निर्माण कार्यको सिलबन्दी दरभाउपत्रमा पेश गरिने आधिकारिक दरभाउ फाराम।',
    applicableMethods: ['sealed-quotation'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'जिल्ला समन्वय समितिको कार्यालय', placeholder: 'कार्यालयको नाम' },
      { key: 'sqNo', label: 'दरभाउपत्र सूचना/ठेक्का नं.', defaultValue: 'SQ/GOODS/02-083/84', placeholder: 'SQ नं.' },
      { key: 'workDesc', label: 'काम/मालसामानको विवरण', defaultValue: 'कार्यालयका लागि फर्निचर तथा कम्प्युटर उपकरण आपूर्ति', placeholder: 'विवरण' },
      { key: 'bidderName', label: 'दरभाउदाता (फर्म/सप्लायर्स)', defaultValue: 'हिमाल स्टेशनरी एण्ड सप्लायर्स', placeholder: 'फर्मको नाम' },
      { key: 'quotedAmount', label: 'जम्मा कबुल रकम (भ्याट बाहेक)', defaultValue: 'रु १४,८०,०००/-', placeholder: 'रकम' },
      { key: 'quotedAmountWords', label: 'जम्मा कबुल रकम (अक्षरमा)', defaultValue: 'चौध लाख असी हजार रुपैयाँ मात्र', placeholder: 'अक्षरमा रकम' },
      { key: 'authorizedPerson', label: 'प्रोप्राइटर/प्रतिनिधिको नाम', defaultValue: 'सुरेश श्रेष्ठ', placeholder: 'नाम' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् कार्यालय प्रमुखज्यू,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}।

विषय: सिलबन्दी दरभाउपत्र पेश गरिएको सम्बन्धमा।
(सूचना नं: ${p.sqNo || '[SQ नं.]'}, काम: ${p.workDesc || '[विवरण]'})

महोदय,
१. यस कार्यालयको मिति [सूचना मिति] को सिलबन्दी दरभाउपत्र आह्वानको सूचना अनुसार हामी तपशिल बमोजिमको मालसामान आपूर्ति / निर्माण कार्य गर्न इच्छुक भई यो सिलबन्दी दरभाउपत्र पेश गर्दछौँ।

२. हाम्रो कबुल मूल्य तपशिल बमोजिम रहेको छ:
   - कुल कबुल रकम (भ्याट बाहेक): ${p.quotedAmount || '[रकम]'}
   - अक्षरमा: ${p.quotedAmountWords || '[अक्षरमा रकम]'}
   (१३% मूल्य अभिवृद्धि कर नियमानुसार थप लाग्नेछ)

३. यो दरभाउपत्र सूचनामा तोकिएको अन्तिम मितिदेखि ४५ दिनसम्म मान्य रहनेछ र सो अवधिभित्र स्वीकृत भएमा हामी तोकिएको म्यादभित्र सामान आपूर्ति / कार्य सम्पन्न गर्न मञ्जुर छौँ।

४. यस फारामसाथ दरभाउपत्र जमानत (Bid Bond), फर्म दर्ता, भ्याट दर्ता, कर चुक्ता प्रमाणपत्र र आवश्यक स्पेसिफिकेसन संलग्न राखिएको छ।

दरभाउदाताको तर्फबाट:
हस्ताक्षर: _______________________
नाम: ${p.authorizedPerson || '[नाम]'}
फर्मको नाम: ${p.bidderName || '[फर्मको नाम]'}
ठेगाना र फोन नं: [ठेगाना र फोन]
(फर्मको छाप)`,
  },

  // 4. संयुक्त उपक्रम सम्झौताको नमूना ढाँचा (JV Agreement / MOU Form)
  {
    id: 'form-jv-agreement',
    category: 'joint-venture',
    categoryNepali: 'संयुक्त उपक्रम (JV) र अख्तियारी',
    titleNepali: 'संयुक्त उपक्रम (JV) सम्झौताको नमूना ढाँचा',
    titleEnglish: 'Joint Venture (JV) Agreement / Memorandum of Understanding',
    sbdSection: 'SBD Section IV: Joint Venture Information Form & Agreement',
    legalReference: 'सार्वजनिक खरिद नियमावली नियम ३१ख, ६५ र SBD ITB Clause 4.1',
    description: '२ वा बढी निर्माण व्यवसायी/आपूर्तिकर्ता मिलेर संयुक्त उपक्रम (JV) मा बिड गर्दा पेश गर्नुपर्ने कानूनी ढाँचा।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works'],
    fields: [
      { key: 'date', label: 'सम्झौता मिति', defaultValue: '२०८३/०१/१२', placeholder: 'मिति' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'projectName', label: 'आयोजनाको नाम', defaultValue: 'प्रशासकीय भवन तथा सडक स्तरोन्नति निर्माण कार्य', placeholder: 'आयोजनाको नाम' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकाय', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'leadPartner', label: 'मूल साझेदार (Lead Partner - ≥४०%)', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि. (शेयर: ५५%)', placeholder: 'मूल साझेदार र शेयर' },
      { key: 'partner2', label: 'दोस्रो साझेदार (Partner 2 - ≥२५%)', defaultValue: 'गघङ निर्माण सेवा (शेयर: ४५%)', placeholder: 'दोस्रो साझेदार र शेयर' },
      { key: 'jvName', label: 'संयुक्त उपक्रमको नाम (JV Name)', defaultValue: 'कखग - गघङ जे.भी.', placeholder: 'जे.भी. को नाम' },
    ],
    contentTemplate: (p) => `संयुक्त उपक्रम (Joint Venture) सम्झौता पत्र
(Memorandum of Understanding / JV Agreement)

लिखितम् हामी तपशिलका पक्षहरूबीच आज मिति ${p.date || '[मिति]'} मा ${p.procuringEntity || '[सार्वजनिक निकाय]'} द्वारा आह्वान गरिएको ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को "${p.projectName || '[आयोजनाको नाम]'}" कार्यको बोलपत्रमा संयुक्त उपक्रम (JV) खडा गरी भाग लिन देहाय बमोजिमको सम्झौता सम्पन्न भयो:

१. संयुक्त उपक्रमको नाम (JV Name):
   यस संयुक्त उपक्रमको नाम "${p.jvName || '[JV को नाम]'}" रहनेछ र यसको मुख्य सम्पर्क कार्यालय [ठेगाना] मा रहनेछ।

२. साझेदार पक्षहरू र हिस्सा (Share Breakdown):
   क) प्रथम पक्ष (Lead Partner): ${p.leadPartner || '[मूल साझेदारको नाम र शेयर प्रतिशत - कम्तीमा ४०%]'}
   ख) दोस्रो पक्ष (Other Partner): ${p.partner2 || '[दोस्रो साझेदारको नाम र शेयर प्रतिशत - कम्तीमा २५%]'}
   (कुल हिस्सा: १००%)

३. मूल साझेदार (Lead Partner) को भूमिका र अख्तियारी:
   - प्रथम पक्ष ${p.leadPartner?.split('(')[0] || '[Lead Partner]'} लाई संयुक्त उपक्रमको मूल साझेदार (Lead Partner) मानिनेछ।
   - Lead Partner का अधिकृत प्रतिनिधि श्री [प्रतिनिधिको नाम] लाई बोलपत्र कागजात खरिद गर्ने, हस्ताक्षर गरी पेश गर्ने, स्पष्टीकरण दिने, कार्यालयसँग पत्राचार गर्ने, सम्झौता गर्ने र भुक्तानी बुझिलिने पूर्ण अख्तियारी प्रदान गरिएको छ।

४. संयुक्त तथा व्यक्तिगत दायित्व (Joint and Several Liability):
   दुवै साझेदारहरू यस ठेक्का कार्यको प्राविधिक, आर्थिक, कानूनी तथा कार्यसम्पादन सम्बन्धी सम्पूर्ण दायित्वहरूमा सार्वजनिक निकायप्रति संयुक्त रूपमा र व्यक्तिगत रूपमा (Jointly and Severally) पूर्ण जवाफदेही रहनेछौँ।

५. खरिद सम्झौता अवधिभर कुनै पनि पक्षले अर्को पक्षको र सार्वजनिक निकायको पूर्व स्वीकृति बिना यो सम्झौता भङ्ग गर्न वा आफ्नो दायित्वबाट पन्छिन पाउने छैन।

तपशिल (साझेदार पक्षहरूको हस्ताक्षर तथा छाप):

प्रथम पक्ष (Lead Partner):                           दोस्रो पक्ष (Partner):
हस्ताक्षर: _____________________                   हस्ताक्षर: _____________________
नाम: ________________________                   नाम: ________________________
पद: _________________________                   पद: _________________________
फर्म/कम्पनी: __________________                   फर्म/कम्पनी: __________________
छाप:                                            छाप:`,
  },

  // 5. साझेदारको अख्तियारी पत्र (Power of Attorney)
  {
    id: 'form-power-of-attorney',
    category: 'joint-venture',
    categoryNepali: 'संयुक्त उपक्रम (JV) र अख्तियारी',
    titleNepali: 'साझेदारको अख्तियारी पत्र (Power of Attorney)',
    titleEnglish: 'Power of Attorney for Lead Partner / Authorized Representative',
    sbdSection: 'SBD Section IV: Power of Attorney Format',
    legalReference: 'सार्वजनिक खरिद नियमावली र SBD ITB Clause 20.2',
    description: 'कम्पनीको सञ्चालक समिति वा JV साझेदारले बोलपत्र सम्बन्धी काम कारबाही गर्न आधिकारिक व्यक्तिलाई दिने वारिसनामा पत्र।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१२', placeholder: 'मिति' },
      { key: 'companyName', label: 'फर्म/कम्पनीको नाम', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'कम्पनीको नाम' },
      { key: 'attorneyPerson', label: 'अख्तियारी पाउने व्यक्तिको नाम र पद', defaultValue: 'श्री रामचन्द्र श्रेष्ठ (प्रबन्ध निर्देशक)', placeholder: 'व्यक्तिको नाम' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकाय', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
    ],
    contentTemplate: (p) => `अख्तियारी पत्र (Power of Attorney)

मिति: ${p.date || '[मिति]'}

हामी, ${p.companyName || '[फर्म/कम्पनीको नाम]'}, कम्पनी ऐन बमोजिम दर्ता भई [ठेगाना] मा मुख्य कार्यालय रहेको संस्थाको सञ्चालक समितिको मिति [निर्णय मिति] को निर्णयानुसार, हाम्रा ${p.attorneyPerson || '[अख्तियारी पाउने व्यक्तिको नाम र पद]'} लाई ${p.procuringEntity || '[सार्वजनिक निकाय]'} द्वारा आह्वान गरिएको ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को बोलपत्र प्रक्रियामा हाम्रो तर्फबाट:

१. e-GP प्रणाली मार्फत बोलपत्र पेश गर्न, डिजिटल हस्ताक्षर प्रयोग गर्न,
२. बोलपत्र सम्बन्धी सम्पूर्ण फाराम, BOQ, सम्झौता तथा कागजातमा हस्ताक्षर गर्न,
३. सार्वजनिक निकायसँग स्पष्टीकरण, वार्ता, सम्झौता गर्न र आवश्यक सम्पूर्ण कानूनी दायित्व पूरा गर्न,

पूर्ण अख्तियारी (Power of Attorney) प्रदान गर्दछौँ। निजले गरेको हस्ताक्षर तथा काम कारबाही कम्पनी आफैंले गरे सरह मान्य र बाध्यकारी हुनेछ।

अख्तियारी पाउनेको दस्तखत: _____________________
नाम: ${p.attorneyPerson || '[व्यक्तिको नाम]'}

अख्तियारी दिने संस्थाको तर्फबाट:
हस्ताक्षर: _____________________
नाम: [सञ्चालक / अध्यक्षको नाम]
पद: अध्यक्ष / प्रबन्ध सञ्चालक
(कम्पनीको छाप)`,
  },

  // 6. बोलपत्र जमानत ढाँचा (Bid Security / Bank Guarantee Format)
  {
    id: 'form-bid-security-guarantee',
    category: 'banking-guarantee',
    categoryNepali: 'बैंक जमानत तथा ऋण सुविधा (FIN-5)',
    titleNepali: 'बोलपत्र जमानत (बैंक ग्यारेन्टी) आधिकारिक ढाँचा',
    titleEnglish: 'Bid Security (Bank Guarantee) Format - Section IV',
    sbdSection: 'SBD Section IV: Bid Security Form',
    legalReference: 'सार्वजनिक खरिद ऐन दफा २१, नियमावली नियम ५३, र SBD ITB Clause 19',
    description: 'वाणिज्य बैंक वा वित्तीय संस्थाले सार्वजनिक निकायको नाममा जारी गर्नुपर्ने अपरिवर्तनीय बोलपत्र जमानतको आधिकारिक कानूनी ढाँचा।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods', 'sealed-quotation'],
    fields: [
      { key: 'date', label: 'ग्यारेन्टी जारी मिति', defaultValue: '२०८३/०१/१४', placeholder: 'जारी मिति' },
      { key: 'bankName', label: 'बैंक तथा शाखाको नाम', defaultValue: 'ग्लोबल आइएमई बैंक लि., कान्तिपथ शाखा', placeholder: 'बैंकको नाम' },
      { key: 'beneficiary', label: 'हितग्राही (सार्वजनिक निकाय)', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग, बबरमहल', placeholder: 'कार्यालयको नाम' },
      { key: 'bidderName', label: 'बोलपत्रदाताको नाम', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'फर्म/कम्पनी' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'guaranteeAmount', label: 'जमानत रकम (अंकमा)', defaultValue: 'रु ६,००,०००/-', placeholder: 'अंकमा रकम' },
      { key: 'guaranteeAmountWords', label: 'जमानत रकम (अक्षरमा)', defaultValue: 'छ लाख रुपैयाँ मात्र', placeholder: 'अक्षरमा रकम' },
      { key: 'validityDate', label: 'ग्यारेन्टी मान्य रहने अन्तिम मिति', defaultValue: '२०८३/०५/१५ (कम्तीमा १२० दिन)', placeholder: 'मान्य मिति' },
    ],
    contentTemplate: (p) => `बोलपत्र जमानत (Bank Guarantee for Bid Security)
(आधिकारिक ढाँचा - SBD Section IV)

ग्यारेन्टी नं: [ग्यारेन्टी नं.]
जारी मिति: ${p.date || '[जारी मिति]'}

हितग्राही (Beneficiary):
${p.beneficiary || '[सार्वजनिक निकायको नाम तथा ठेगाना]'}।

हामीलाई जानकारी गराइएको छ कि हाम्रो ग्राहक ${p.bidderName || '[बोलपत्रदाताको नाम]'} (यसपछि "बोलपत्रदाता" भनिएको) ले यहाँको कार्यालयबाट आह्वान गरिएको ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को कार्यका लागि मिति [बिड मिति] मा बोलपत्र पेश गरेको छ।

तसर्थ, बोलपत्रदाताको अनुरोधमा, हामी ${p.bankName || '[बैंकको नाम]'}, बैंकको तर्फबाट तपाइँलाई विना शर्त र अपरिवर्तनीय रूपमा अधिकतम ${p.guaranteeAmount || '[रकम]'} (अक्षरमा: ${p.guaranteeAmountWords || '[अक्षरमा रकम]'}) सम्मको रकम भुक्तानी गर्न दायित्व स्वीकार गर्दछौँ।

यस कार्यालयबाट बोलपत्रदाताले देहायका अवस्थाहरूमध्ये कुनै अवस्था उल्लंघन गरेको भनी पहिलो लिखित मागदाबी प्राप्त हुनासाथ हामी कुनै आपत्ति वा विवाद बिना माग गरिएको रकम तुरुन्त भुक्तानी गर्नेछौँ:
क) बोलपत्रदाताले बोलपत्र कागजातमा तोकिएको बोलपत्र मान्य अवधिभित्र आफ्नो बोलपत्र फिर्ता लिएमा वा संशोधन गरेमा;
ख) कार्यालयबाट बोलपत्र स्वीकृतिको सूचना प्राप्त भएपछि तोकिएको म्यादभित्र ठेक्का सम्झौता गर्न अस्वीकार गरेमा;
ग) तोकिएको म्यादभित्र कार्यसम्पादन जमानत (Performance Security) पेश गर्न असफल भएमा; वा
घ) बोलपत्र कागजातको प्रावधान अनुसार मूल्य समायोजन वा योग्यता प्रमाणीकरण स्वीकार नगरेमा।

यो जमानत बोलपत्र पेश गर्ने अन्तिम मितिदेखि कम्तीमा ३० दिन थप गरी मिति ${p.validityDate || '[मान्य मिति]'} सम्म पूर्ण रूपमा मान्य (Valid) रहनेछ। यस जमानत उपरको कुनै पनि लिखित दाबी उक्त मिति वा सो भन्दा अगावै यस बैंकको शाखामा आइपुग्नु पर्नेछ।

बैंकको तर्फबाट अधिकृत हस्ताक्षरकर्ताहरू:

हस्ताक्षर १: _____________________              हस्ताक्षर २: _____________________
नाम: __________________________              नाम: __________________________
पद: ___________________________              पद: ___________________________
(बैंकको आधिकारिक छाप)`,
  },

  // 7. बैंकको ऋण सुविधा प्रतिबद्धता पत्र (Letter of Commitment for Line of Credit - Form FIN-5)
  {
    id: 'form-line-of-credit-fin5',
    category: 'banking-guarantee',
    categoryNepali: 'बैंक जमानत तथा ऋण सुविधा (FIN-5)',
    titleNepali: "बैंकको ऋण सुविधा प्रतिबद्धता पत्र (Line of Credit - Form FIN-5)",
    titleEnglish: "Letter of Commitment for Bank's Undertaking for Line of Credit",
    sbdSection: 'SBD Section IV: Form FIN - 5 (Credit Line)',
    legalReference: 'सार्वजनिक खरिद नियमावली नियम ६५(४) र SBD Section III (Financial Resources)',
    description: 'बोलपत्रदाताको नगद प्रवाह (Cash Flow) तथा तरल सम्पत्ति प्रमाणीकरणका लागि वाणिज्य बैंकले दिने ऋण सुविधा प्रतिबद्धताको अनिवार्य ढाँचा।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१४', placeholder: 'मिति' },
      { key: 'bankName', label: 'बैंकको नाम र शाखा', defaultValue: 'नेपाल बैंक लि., काठमाडौँ शाखा', placeholder: 'बैंकको नाम' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकाय (हितग्राही)', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'projectName', label: 'आयोजनाको नाम', defaultValue: 'प्रशासकीय भवन तथा सडक स्तरोन्नति निर्माण कार्य', placeholder: 'आयोजना' },
      { key: 'bidderName', label: 'बोलपत्रदाता', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'फर्म/कम्पनी' },
      { key: 'creditAmount', label: 'ऋण सुविधा रकम (अंकमा)', defaultValue: 'रु ५५,००,०००/-', placeholder: 'अंकमा रकम' },
      { key: 'creditAmountWords', label: 'ऋण सुविधा रकम (अक्षरमा)', defaultValue: 'पचपन्न लाख रुपैयाँ मात्र', placeholder: 'अक्षरमा रकम' },
    ],
    contentTemplate: (p) => `Form FIN - 5
Letter of Commitment for Bank's Undertaking for Line of Credit
(बैंकको ऋण सुविधा सम्बन्धी आधिकारिक प्रतिबद्धता पत्र)

मिति: ${p.date || '[मिति]'}
पत्र संख्या: [पत्र संख्या]

सेवामा,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}
[कार्यालयको ठेगाना]।

विषय: ऋण सुविधा प्रतिबद्धता पत्र (Line of Credit) जारी गरिएको सम्बन्धमा।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'}, काम: ${p.projectName || '[आयोजनाको नाम]'})

महोदय,
१. माथि उल्लिखित ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को बोलपत्र कागजातको प्रावधान अनुसार हामी, ${p.bankName || '[बैंकको नाम]'}, हाम्रा ग्राहक ${p.bidderName || '[बोलपत्रदाताको नाम]'} (यसपछि "बोलपत्रदाता" भनिएको) लाई यदि निजको बोलपत्र स्वीकृत भई खरिद सम्झौता भएमा उक्त सम्झौता बमोजिमको कार्य सुचारु रूपमा सम्पन्न गर्नका लागि आवश्यक परेको खण्डमा:

   रकम: ${p.creditAmount || '[रकम]'}
   (अक्षरमा: ${p.creditAmountWords || '[अक्षरमा रकम]'})

   बराबरको रकमसम्मको ऋण सुविधा (Revolving Line of Credit / Overdraft facility) उपलब्ध गराउन पूर्ण रूपमा प्रतिबद्ध रहेको व्यहोरा प्रमाणित गर्दछौँ।

२. यो सुविधा बोलपत्रदाताले यस ठेक्का कार्यको कार्यान्वयन (Execution) प्रयोजनका लागि मात्र उपयोग गर्न पाउनेछ।

३. यो प्रतिबद्धता पत्र बोलपत्र पेश गर्ने अन्तिम मितिदेखि बोलपत्र मान्य अवधि र खरिद सम्झौता अवधिभर निरन्तर मान्य रहनेछ।

बैंकको तर्फबाट आधिकारिक हस्ताक्षर:

हस्ताक्षर १: _____________________              हस्ताक्षर २: _____________________
नाम: __________________________              नाम: __________________________
पद: ___________________________              पद: ___________________________
(बैंकको आधिकारिक छाप)`,
  },

  // 8. कार्यसम्पादन जमानत ढाँचा (Performance Security)
  {
    id: 'form-performance-security',
    category: 'banking-guarantee',
    categoryNepali: 'बैंक जमानत तथा ऋण सुविधा (FIN-5)',
    titleNepali: 'कार्यसम्पादन जमानत (Performance Security) ढाँचा',
    titleEnglish: 'Performance Security Bank Guarantee Format - Section IX',
    sbdSection: 'SBD Section IX: Contract Forms (Performance Security)',
    legalReference: 'सार्वजनिक खरिद ऐन दफा ५४ र खरिद नियमावली नियम ६५(४)',
    description: 'बोलपत्र स्वीकृत भएपछि ठेक्का सम्झौता गर्नुपूर्व कबुल रकमको ५% (र १५% भन्दा बढी घटेको भए थप ५०% समेत) बुझाउनुपर्ने बैंक जमानत ढाँचा।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०२/०५', placeholder: 'मिति' },
      { key: 'bankName', label: 'बैंकको नाम र शाखा', defaultValue: 'राष्ट्रिय वाणिज्य बैंक, सिंहदरबार शाखा', placeholder: 'बैंक' },
      { key: 'beneficiary', label: 'हितग्राही (सार्वजनिक निकाय)', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'contractorName', label: 'निर्माण व्यवसायी/आपूर्तिकर्ता', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'व्यवसायीको नाम' },
      { key: 'contractNo', label: 'ठेक्का सम्झौता नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'securityAmount', label: 'जमानत रकम (अंकमा)', defaultValue: 'रु १३,२७,५००/-', placeholder: 'अंकमा रकम' },
      { key: 'securityAmountWords', label: 'जमानत रकम (अक्षरमा)', defaultValue: 'तेह्र लाख सत्ताइस हजार पाँच सय रुपैयाँ मात्र', placeholder: 'अक्षरमा रकम' },
      { key: 'validityDate', label: 'मान्य मिति (काम सम्पन्न + त्रुटि सच्याउने अवधि)', defaultValue: '२०८४/०८/३०', placeholder: 'मान्य मिति' },
    ],
    contentTemplate: (p) => `कार्यसम्पादन जमानत (Performance Security Bank Guarantee)
(SBD Section IX - Contract Forms)

ग्यारेन्टी नं: [ग्यारेन्टी नं.]
जारी मिति: ${p.date || '[जारी मिति]'}

हितग्राही (Beneficiary):
${p.beneficiary || '[सार्वजनिक निकायको नाम तथा ठेगाना]'}।

हामीलाई जानकारी गराइएको छ कि ${p.contractorName || '[निर्माण व्यवसायी/आपूर्तिकर्ता]'} (यसपछि "ठेकेदार" भनिएको) ले यहाँको कार्यालयसँग ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को कार्य सम्पन्न गर्नका लागि खरिद सम्झौता गर्ने भएको छ र सम्झौताको शर्त अनुसार कार्यसम्पादन जमानत बापतको बैंक ग्यारेन्टी पेश गर्नुपर्ने भएको छ।

तसर्थ, ठेकेदारको अनुरोधमा, हामी ${p.bankName || '[बैंकको नाम]'}, यहाँको कार्यालयलाई विना शर्त र अपरिवर्तनीय रूपमा अधिकतम ${p.securityAmount || '[रकम]'} (अक्षरमा: ${p.securityAmountWords || '[अक्षरमा रकम]'}) सम्मको रकम भुक्तानी गर्न पूर्ण प्रतिबद्धता व्यक्त गर्दछौँ।

ठेकेदारले खरिद सम्झौता बमोजिमको कुनै शर्त वा दायित्व उल्लंघन गरेको भनी यस कार्यालयको आधिकारिक पत्रबाट पहिलो लिखित मागदाबी प्राप्त हुनासाथ हामी कुनै विवाद वा अदालतको आदेश नपर्खी माग गरिएको रकम तुरून्त भुक्तानी गर्नेछौँ।

यो जमानत निर्माण कार्य सम्पन्न हुने म्याद र तत्पश्चातको त्रुटि सच्याउने अवधि (Defect Liability Period - सामान्यतया ३६५ दिन) समेत समेटी मिति ${p.validityDate || '[मान्य मिति]'} सम्म पूर्ण रूपमा मान्य रहनेछ।

बैंकको अधिकृत हस्ताक्षरकर्ताहरू:
हस्ताक्षर १: _____________________              हस्ताक्षर २: _____________________
नाम/पद: _______________________              नाम/पद: _______________________
(बैंकको छाप)`,
  },

  // 9. पेश्की जमानत (Advance Payment Guarantee)
  {
    id: 'form-advance-payment-guarantee',
    category: 'banking-guarantee',
    categoryNepali: 'बैंक जमानत तथा ऋण सुविधा (FIN-5)',
    titleNepali: 'पेश्की भुक्तानी जमानत (Advance Payment Guarantee) ढाँचा',
    titleEnglish: 'Advance Payment Bank Guarantee Format',
    sbdSection: 'SBD Section IX: Contract Forms (Advance Guarantee)',
    legalReference: 'सार्वजनिक खरिद नियमावली नियम ८९ र SBD GCC Clause 51',
    description: 'ठेक्का सम्झौता पश्चात कार्य सञ्चालनका लागि अधिकतम १०-२०% सम्म पेश्की लिँदा बैंकबाट जारी गरिने शतप्रतिशत बराबरको पेश्की जमानत।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works'],
    fields: [
      { key: 'date', label: 'जारी मिति', defaultValue: '२०८३/०२/१०', placeholder: 'मिति' },
      { key: 'bankName', label: 'बैंकको नाम र शाखा', defaultValue: 'कृषि विकास बैंक लि., मुख्य शाखा', placeholder: 'बैंक' },
      { key: 'beneficiary', label: 'हितग्राही कार्यालय', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'contractorName', label: 'निर्माण व्यवसायीको नाम', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'निर्माण व्यवसायी' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'advanceAmount', label: 'पेश्की रकम (अंकमा)', defaultValue: 'रु २६,५५,०००/-', placeholder: 'अंकमा रकम' },
      { key: 'advanceAmountWords', label: 'पेश्की रकम (अक्षरमा)', defaultValue: 'छब्बीस लाख पचपन्न हजार रुपैयाँ मात्र', placeholder: 'अक्षरमा रकम' },
    ],
    contentTemplate: (p) => `पेश्की भुक्तानी जमानत (Advance Payment Bank Guarantee)

ग्यारेन्टी नं: [ग्यारेन्टी नं.]
जारी मिति: ${p.date || '[जारी मिति]'}

हितग्राही:
${p.beneficiary || '[सार्वजनिक निकायको नाम तथा ठेगाना]'}।

हामीलाई जानकारी गराइएको छ कि ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को कार्यका लागि खरिद सम्झौता बमोजिम यहाँको कार्यालयबाट निर्माण व्यवसायी ${p.contractorName || '[निर्माण व्यवसायीको नाम]'} लाई परिचालन पेश्की (Mobilization Advance) बापत रकम उपलब्ध गराउन लागिएको छ।

उक्त पेश्की रकमको सुरक्षणका लागि ठेकेदारको अनुरोधमा, हामी ${p.bankName || '[बैंकको नाम]'}, विना शर्त र अपरिवर्तनीय रूपमा अधिकतम ${p.advanceAmount || '[रकम]'} (अक्षरमा: ${p.advanceAmountWords || '[अक्षरमा रकम]'}) सम्म भुक्तानी गर्न प्रत्याभूति (Guarantee) दिन्छौँ।

ठेकेदारले पेश्की रकम सम्झौताको उद्देश्य बाहेक अन्यत्र प्रयोग गरेमा वा चालू बिलहरूबाट पेश्की रकम कट्टा हुन नसकेमा, यहाँको कार्यालयको पहिलो लिखित मागदाबी प्राप्त हुनासाथ हामी उक्त रकम तुरुन्त भुक्तानी गर्नेछौँ।

ठेकेदारको चालू बिलबाट पेश्की रकम कट्टा हुँदै जाँदा यो जमानत रकम सोही अनुपातमा स्वतः घट्दै जानेछ र पूर्ण कट्टा भएपछि यो जमानत स्वतः निष्कृय हुनेछ।

बैंकको अधिकृत हस्ताक्षरकर्ताहरू:
हस्ताक्षर: _____________________
नाम र पद: _____________________
(बैंकको छाप)`,
  },

  // 10. बोलपत्रपूर्व बैठकमा स्पष्टीकरण माग्ने पत्र (Pre-Bid Clarification Request)
  {
    id: 'form-prebid-clarification',
    category: 'bidder-letters',
    categoryNepali: 'प्रि-बिड, संशोधन तथा सहमति पत्रहरू',
    titleNepali: 'बोलपत्रपूर्व बैठकमा स्पष्टीकरण माग्ने पत्र (Pre-Bid Clarification Letter)',
    titleEnglish: 'Request for Clarification / Pre-Bid Meeting Query Format',
    sbdSection: 'SBD ITB Clause 7: Clarification of Bidding Documents',
    legalReference: 'सार्वजनिक खरिद नियमावली नियम ४०, दफा १६ र e-GP निर्देशिका दफा २५',
    description: 'कागजात, स्पेसिफिकेसन वा योग्यताका शर्त अस्पष्ट भएमा बोलपत्रदाताले e-GP वा कार्यालयमा बुझाउने प्रश्न/स्पष्टीकरण पत्र।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/०८', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'contractNo', label: 'ठेक्का/सूचना नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'projectName', label: 'आयोजनाको नाम', defaultValue: 'प्रशासकीय भवन तथा सडक स्तरोन्नति निर्माण कार्य', placeholder: 'आयोजना' },
      { key: 'bidderName', label: 'बोलपत्रदाताको नाम', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'कम्पनीको नाम' },
      { key: 'querySubject', label: 'स्पष्टीकरण मागिएको दफा/बुँदा', defaultValue: 'Section III - योग्यताको आधार बुँदा २.४ (समान प्रकृतिको कार्य अनुभव)', placeholder: 'दफा/बुँदा' },
      { key: 'queryDetails', label: 'प्रश्न तथा स्पष्टीकरण व्यहोरा', defaultValue: 'उक्त बुँदामा उल्लेखित अनुभवको रकम भ्याट सहित वा भ्याट बाहेक के हो र समान प्रकृतिको काममा आर.सी.सी. फ्रेम स्ट्रक्चरलाई मान्न सकिने वा नसकिने?', placeholder: 'प्रश्न' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् खरिद अधिकृतज्यू,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}।

विषय: बोलपत्र कागजात सम्बन्धमा स्पष्टीकरण (Clarification) माग गरिएको बारे।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'}, आयोजना: ${p.projectName || '[आयोजनाको नाम]'})

महोदय,
१. माथि उल्लिखित ठेक्काको प्रकाशित बोलपत्र कागजातको अध्ययन गर्दा तपशिलको दफा/विषयमा द्विविधा उत्पन्न भएकोले सार्वजनिक खरिद ऐन, २०६३ को दफा १६ तथा SBD को ITB Clause 7 बमोजिम स्पष्टीकरण उपलब्ध गराइदिनुहुन यो अनुरोध पेश गरेका छौँ:

२. स्पष्टीकरण मागिएको बुँदा र प्रश्न विवरण:
   ---------------------------------------------------------------------------------------------------------
   क्र.सं. | बोलपत्र खण्ड तथा दफा (Section & Clause) | स्पष्टीकरण मागिएको विषय तथा जिज्ञासा
   ---------------------------------------------------------------------------------------------------------
   १.     | ${p.querySubject || '[दफा/खण्ड]'} | ${p.queryDetails || '[जिज्ञासा]'}
   ---------------------------------------------------------------------------------------------------------

३. यस स्पष्टीकरणले बोलपत्रदाताहरूलाई तथ्यपरक र प्रतिस्पर्धी दररेट तथा कागजात पेश गर्न सहज हुने विश्वास लिएका छौँ। उक्त विषयमा आगामी प्रि-बिड बैठकमा छलफल गरी e-GP प्रणाली मार्फत सबै बोलपत्रदातालाई जानकारी हुने गरी स्पष्ट जवाफ जारी गरिदिनुहुन हार्दिक अनुरोध गर्दछौँ।

निवेदक:
हस्ताक्षर: _____________________
नाम: [प्रतिनिधिको नाम]
फर्म/कम्पनी: ${p.bidderName || '[फर्म/कम्पनीको नाम]'}
फोन / ईमेल: [सम्पर्क विवरण]
(कम्पनीको छाप)`,
  },

  // 11. बोलपत्र फिर्ता वा संशोधन पत्र (Bid Modification / Withdrawal Notice under e-GP)
  {
    id: 'form-bid-modification-withdrawal',
    category: 'bidder-letters',
    categoryNepali: 'प्रि-बिड, संशोधन तथा सहमति पत्रहरू',
    titleNepali: 'बोलपत्र फिर्ता वा संशोधन पत्र (Bid Modification / Withdrawal Notice)',
    titleEnglish: 'Notice of Bid Modification / Withdrawal - ITB Clause 24',
    sbdSection: 'SBD ITB Clause 24: Withdrawal, Substitution, and Modification of Bids',
    legalReference: 'सार्वजनिक खरिद ऐन दफा २०, नियमावली नियम ५७ र e-GP निर्देशिका दफा २७',
    description: 'बोलपत्र पेश गर्ने अन्तिम समय अगावै पेश गरिसकेको बोलपत्र संशोधन गर्न वा फिर्ता लिन e-GP प्रणाली मार्फत दिइने सूचना।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१४', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकाय', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'actionType', label: 'कार्यको प्रकृति (फिर्ता / संशोधन)', defaultValue: 'बोलपत्र संशोधन (Bid Modification)', placeholder: 'फिर्ता वा संशोधन' },
      { key: 'bidderName', label: 'बोलपत्रदाता', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'कम्पनीको नाम' },
      { key: 'submissionDetails', label: 'पहिले पेश भएको बिड विवरण', defaultValue: 'मिति २०८३/०१/१२ मा e-GP मार्फत पेश भएको बिड (Submission ID: 123456)', placeholder: 'बिड ID' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् खरिद अधिकृतज्यू,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}।

विषय: बोलपत्र ${p.actionType || 'संशोधन/फिर्ता'} गरिएको आधिकारिक सूचना।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'})

महोदय,
१. माथि उल्लिखित ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} मा हाम्रो फर्म/कम्पनी ${p.bidderName || '[बोलपत्रदाताको नाम]'} द्वारा ${p.submissionDetails || '[पहिले पेश भएको बिड विवरण]'} मार्फत बोलपत्र पेश गरिएको थियो।

२. सार्वजनिक खरिद ऐन, २०६३ को दफा २० तथा बोलपत्र कागजातको ITB Clause 24 को अधिकार प्रयोग गरी बोलपत्र पेश गर्ने अन्तिम समय (Deadline) भन्दा अगावै उक्त बोलपत्रलाई तपशिल बमोजिम गर्न यो लिखित सूचना तथा e-GP प्रणाली मार्फत अनुरोध गर्दछौँ:

   कारबाहीको प्रकार: [ ${p.actionType || 'संशोधन'} ]
   व्यहोरा: हामीले पहिले पेश गरेको बोलपत्रको सट्टामा e-GP प्रणाली मार्फत अद्यावधिक गरिएको संशोधित प्राविधिक/आर्थिक कागजातहरू रितपूर्वक अपलोड गरी प्रतिस्थापन (Substitute/Modify) गरेका छौँ। सोही बमोजिम अन्तिम बोलपत्र अभिलेखमा समावेश गरिदिनुहुन अनुरोध छ।

३. हाम्रो पहिले जारी भएको बोलपत्र जमानत (Bid Bond) यथावत मान्य रहनेछ।

भवदीय,
हस्ताक्षर: _____________________
अधिकृत प्रतिनिधि: [नाम र पद]
फर्म/कम्पनी: ${p.bidderName || '[कम्पनीको नाम]'}
(कम्पनीको छाप)`,
  },

  // 12. बोलपत्रको म्याद थप सम्बन्धी सहमति पत्र (Bid Validity Extension Consent)
  {
    id: 'form-validity-extension-consent',
    category: 'bidder-letters',
    categoryNepali: 'प्रि-बिड, संशोधन तथा सहमति पत्रहरू',
    titleNepali: 'बोलपत्रको म्याद थप सम्बन्धी सहमति पत्र (Bid Validity Extension Consent)',
    titleEnglish: 'Consent for Extension of Bid Validity Period - ITB Clause 18.2',
    sbdSection: 'SBD ITB Clause 18: Period of Validity of Bids',
    legalReference: 'सार्वजनिक खरिद नियमावली नियम ५२ र SBD ITB 18.2',
    description: 'कार्यालयले मूल्याङ्कन अवधि लम्बिएर म्याद थप माग गर्दा बोलपत्रदाताले दिने म्याद थप सहमति र बैंक ग्यारेन्टी नवीकरण पत्र।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०४/०५', placeholder: 'मिति' },
      { key: 'officeLetterDate', label: 'कार्यालयको पत्राचार मिति र च.नं.', defaultValue: 'मिति २०८३/०४/०१, च.नं. १२५', placeholder: 'कार्यालयको पत्र मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकाय', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'bidderName', label: 'बोलपत्रदाता', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'कम्पनीको नाम' },
      { key: 'extendedDays', label: 'थप गरिएको दिन', defaultValue: '३० दिन (मिति २०८३/०५/३० सम्म)', placeholder: 'थप दिन' },
      { key: 'bankBondStatus', label: 'बैंक ग्यारेन्टी नवीकरण स्थिति', defaultValue: 'उक्त म्याद अनुसारको ३० दिन थप भएको बैंक ग्यारेन्टी नवीकरण पत्र संलग्न छ।', placeholder: 'ग्यारेन्टी स्थिति' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् खरिद अधिकृतज्यू,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}।

विषय: बोलपत्र मान्य अवधि (Bid Validity) थप गर्न सहमति प्रदान गरिएको सम्बन्धमा।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'})

महोदय,
१. प्रस्तुत विषयमा यहाँको कार्यालयको ${p.officeLetterDate || '[कार्यालयको पत्र मिति/च.नं.]'} को पत्र प्राप्त भयो।

२. उक्त पत्रमा अनुरोध भए बमोजिम ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} को हाम्रो बोलपत्रको मान्य अवधि (Bid Validity) थप ${p.extendedDays || '[थप गरिएको दिन]'} का लागि लम्ब्याउन हामी मञ्जुर रहेको व्यहोरा सादर जानकारी गराउँदछौँ।

३. सोही बमोजिम हाम्रो बोलपत्र जमानत (Bid Security / Bank Guarantee) को म्याद पनि बैंकबाट नवीकरण गराई थपिएको म्याद भन्दा ३० दिन बढी रहने गरी जारी गरिएको सक्कल बैंक ग्यारेन्टी नवीकरण पत्र यसैसाथ संलग्न गरिएको छ।

भवदीय,
हस्ताक्षर: _____________________
अधिकृत प्रतिनिधि: [नाम र पद]
फर्म/कम्पनी: ${p.bidderName || '[कम्पनीको नाम]'}
(कम्पनीको छाप)`,
  },

  // 13. कार्यालय प्रमुख समक्ष पुनरावलोकन निवेदन (Review Application under Section 47)
  {
    id: 'form-review-entity-head',
    category: 'review-appeal',
    categoryNepali: 'पुनरावलोकन तथा उजुरी (दफा ४७/४९)',
    titleNepali: 'कार्यालय प्रमुख समक्ष पुनरावलोकन निवेदन (दफा ४७)',
    titleEnglish: 'Application for Administrative Review to Head of Procuring Entity (Section 47)',
    sbdSection: 'खरिद ऐन दफा ४७ तथा SBD ITB Clause 43',
    legalReference: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ४७ र नियमावली नियम १३४-१३५',
    description: 'आशयको सूचना (LOI) प्रकाशित भएको ७ दिनभित्र निर्णयकर्ता कार्यालय प्रमुख समक्ष बोलपत्रदाताले दिने पुनरावलोकन निवेदन।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०२/०२', placeholder: 'मिति' },
      { key: 'loiDate', label: 'आशयको सूचना (LOI) प्रकाशित मिति', defaultValue: '२०८३/०१/२६ (७ दिनभित्र)', placeholder: 'LOI मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकाय', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'कार्यालय' },
      { key: 'entityHead', label: 'कार्यालय प्रमुखको पद', defaultValue: 'महानिर्देशकज्यू / आयोजना निर्देशकज्यू', placeholder: 'प्रमुखको पद' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'bidderName', label: 'निवेदक बोलपत्रदाता', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'कम्पनीको नाम' },
      { key: 'groundsForReview', label: 'उजुरीका मुख्य आधारहरू', defaultValue: 'हाम्रो बोलपत्र सारभूत रूपमा प्रभावग्राही र न्यूनतम कबुल अङ्कको हुँदाहुँदै विना आधार गैर-जिम्मेवार देखाइएको र प्रतिस्पर्धीलाई बढी मूल्यमा छनौट गरिएको।', placeholder: 'उजुरीका आधारहरू' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् ${p.entityHead || 'कार्यालय प्रमुखज्यू'},
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}।

विषय: सार्वजनिक खरिद ऐन, २०६३ को दफा ४७ बमोजिम पुनरावलोकन गरी पाऊँ।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'})

निवेदक: ${p.bidderName || '[निवेदक बोलपत्रदाताको नाम]'}

महोदय,
१. उपर्युक्त विषयमा यस कार्यालयबाट आह्वान गरिएको ठेक्का नं. ${p.contractNo || '[ठेक्का नं.]'} मा मिति ${p.loiDate || '[LOI मिति]'} मा प्रकाशित आशयको सूचना (Letter of Intent - LOI) उपर चित्त नबुझी सार्वजनिक खरिद ऐन, २०६३ को दफा ४७ तथा नियमावलीको नियम १३४ बमोजिम ७ (सात) दिनको हदम्यादभित्र यो पुनरावलोकन निवेदन पेश गरेका छौँ।

२. पुनरावलोकनका मुख्य बुँदा तथा आधारहरू:
   क) ${p.groundsForReview || '[उजुरीका मुख्य आधारहरू]'}
   ख) हाम्रो प्राविधिक तथा आर्थिक प्रस्ताव बोलपत्र कागजातका सम्पूर्ण प्रावधान अनुकूल हुँदाहुँदै मूल्यांकन समितिले गरेको निर्णय खरिद ऐनको दफा २५ तथा दफा २७ को विपरीत रहेको छ।
   ग) बोलपत्र कागजातको कुनै सानो त्रुटि (Minor informality) लाई सारभूत त्रुटि मानी अयोग्य ठहराउनु खरिद नियमावलीको नियम ६३ को मर्म विपरित छ।

३. माग दाबी:
   अतः उल्लिखित तथ्य तथा कानूनी व्यवस्थाका आधारमा उक्त गैर-कानूनी मूल्याङ्कन तथा आशयको सूचना तत्काल बदर गरी हाम्रो बोलपत्रलाई न्यूनतम मूल्याङ्कित प्रभावग्राही बोलपत्रका रूपमा स्वीकार गर्न खरिद ऐनको दफा ४७(३) बमोजिम ५ दिनभित्र न्यायोचित निर्णय गरिदिनुहुन सादर अनुरोध गर्दछौँ।

संलग्न कागजातहरू:
१. आशयको सूचनाको प्रतिलिपि
२. बोलपत्र कागजात तथा योग्यता प्रमाणित गर्ने प्रमाणहरू

निवेदक बोलपत्रदाताको तर्फबाट:
हस्ताक्षर: _____________________
अधिकृत प्रतिनिधि: [नाम र पद]
(कम्पनीको छाप)`,
  },

  // 14. सार्वजनिक खरिद पुनरावलोकन समिति (PPRC) समक्ष निवेदन (Review Application under Section 49)
  {
    id: 'form-review-pprc-committee',
    category: 'review-appeal',
    categoryNepali: 'पुनरावलोकन तथा उजुरी (दफा ४७/४९)',
    titleNepali: 'सार्वजनिक खरिद पुनरावलोकन समिति (PPRC) समक्ष निवेदन (दफा ४९)',
    titleEnglish: 'Application for Review to Public Procurement Review Committee - PPRC (Section 49)',
    sbdSection: 'खरिद ऐन दफा ४९ र नियमावली नियम १३६',
    legalReference: 'सार्वजनिक खरिद ऐन, २०६३ को दफा ४९ र नियमावली नियम १३६-१३८',
    description: 'कार्यालय प्रमुखको निर्णय चित्त नबुझेमा वा निर्णय नदिएमा ७ दिनभित्र बोलपत्र रकमको ०.१५% धरौटी राखी PPRC मा दिइने पुनरावलोकन निवेदन।',
    applicableMethods: ['ncb-works', 'two-envelope', 'icb-works', 'ncb-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०२/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'विपक्षी सार्वजनिक निकाय', defaultValue: 'शहरी विकास तथा भवन निर्माण विभाग', placeholder: 'विपक्षी कार्यालय' },
      { key: 'contractNo', label: 'ठेक्का नं.', defaultValue: 'OFFICE/WORKS/NCB/01-083/84', placeholder: 'ठेक्का नं.' },
      { key: 'bidderName', label: 'पुनरावलोकनकर्ता बोलपत्रदाता', defaultValue: 'कखग कन्स्ट्रक्सन प्रा.लि.', placeholder: 'निवेदक कम्पनी' },
      { key: 'entityHeadDecisionDate', label: 'कार्यालय प्रमुखको निर्णय/जानकारी मिति', defaultValue: 'मिति २०८३/०२/०८ (वा निर्णय नदिएको)', placeholder: 'निर्णय मिति' },
      { key: 'securityDepositAmount', label: 'पुनरावलोकन धरौटी (कबुल रकमको ०.१५%)', defaultValue: 'रु ३९,८२५/- (नगद भौचर वा बैंक ग्यारेन्टी)', placeholder: 'धरौटी रकम' },
    ],
    contentTemplate: (p) => `सार्वजनिक खरिद पुनरावलोकन समिति (PPRC) समक्ष पेश गरिएको
पुनरावलोकन निवेदन

मिति: ${p.date || '[मिति]'}

पुनरावलोकनकर्ता (प्रथम पक्ष):
${p.bidderName || '[पुनरावलोकनकर्ता बोलपत्रदाताको नाम तथा ठेगाना]'}

विरुद्ध

विपक्षी (दोस्रो पक्ष):
१. ${p.procuringEntity || '[विपक्षी सार्वजनिक निकाय]'}
२. [सम्बन्धित मूल्याङ्कन समिति]

विषय: सार्वजनिक खरिद ऐन, २०६३ को दफा ४९ तथा नियमावलीको नियम १३६ बमोजिम पुनरावलोकन गरी पाऊँ।
(ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'})

सम्मानित पुनरावलोकन समिति समक्ष निवेदक देहाय बमोजिम सादर निवेदन गर्दछ:

१. अधिकार क्षेत्र र हदम्याद:
   विपक्षी कार्यालयले मिति [LOI मिति] मा प्रकाशित गरेको आशयको सूचना उपर निवेदकले दफा ४७ बमोजिम कार्यालय प्रमुख समक्ष निवेदन दिएकोमा कार्यालय प्रमुखबाट मिति ${p.entityHeadDecisionDate || '[निर्णय मिति]'} मा भएको निर्णय कानून विपरीत भएकोले (वा म्यादभित्र निर्णय नदिएकोले) उक्त जानकारी प्राप्त भएको ७ (सात) दिनको हदम्यादभित्र यो निवेदन पेश गरिएको छ।

२. धरौटी दाखिला विवरण:
   खरिद ऐनको दफा ४९(२) बमोजिम कबुल अङ्कको ०.१५% ले हुन आउने धरौटी रकम ${p.securityDepositAmount || '[धरौटी रकम]'} यस समितिको धरौटी खातामा जम्मा गरेको बैंक भौचर (वा बैंक जमानत) यसैसाथ रितपूर्वक संलग्न गरिएको छ।

३. उजुरीका कानूनी आधार तथा कारणहरू:
   क) निवेदकको बोलपत्र प्राविधिक तथा आर्थिक दुवै दृष्टिले प्रभावग्राही र न्यूनतम मूल्याङ्कित रहेको थियो।
   ख) विपक्षी कार्यालयले बोलपत्र कागजातमा उल्लेख नभएका शर्तहरू (Criteria outside SBD) का आधारमा निवेदकलाई अयोग्य ठहर्‍याई खरिद ऐनको दफा २३ को उल्लंघन गरेको छ।
   ग) सार्वजनिक खरिद पुनरावलोकन समितिबाट विभिन्न मुद्दाहरूमा प्रतिपादित नजिरहरू विपरीत विपक्षीको निर्णय रहेको छ।

४. अन्तरिम आदेश र अन्तिम माग:
   अतः यो निवेदनको अन्तिम किनारा नभएसम्म विपक्षी कार्यालयलाई उक्त ठेक्का सम्झौता गर्ने कार्य तत्काल रोक्न खरिद ऐनको दफा ५० बमोजिम अन्तरिम आदेश जारी गरी पाऊँ। साथै, विपक्षीको गैर-कानूनी निर्णय बदर गरी निवेदकको प्रभावग्राही बोलपत्र स्वीकृत गरी सम्झौता गर्न परमादेश जारी गरी पाऊँ।

संलग्न प्रमाणहरू:
१. ०.१५% धरौटी भौचर / बैंक जमानत
२. कार्यालय प्रमुख समक्ष दिएको निवेदन र प्राप्त निर्णयको प्रतिलिपि
३. बोलपत्र आह्वान तथा LOI को सूचना प्रतिलिपि
४. कम्पनी दर्ता, कर चुक्ता र वारिसनामा

निवेदक:
हस्ताक्षर: _____________________
अधिकृत प्रतिनिधि: [नाम र पद]
फर्म/कम्पनी: ${p.bidderName || '[कम्पनीको नाम]'}
(कम्पनीको छाप)`,
  },

  // 15. उत्पादकको आधिकारिकता पत्र (Manufacturer's Authorization Form - MAF)
  {
    id: 'form-maf',
    category: 'goods-services',
    categoryNepali: 'मालसामान तथा सेवा खरिद',
    titleNepali: 'उत्पादकको आधिकारिकता पत्र (Manufacturer\'s Authorization Form - MAF)',
    titleEnglish: "Manufacturer's Authorization Form - SBD Goods Section IV",
    sbdSection: 'SBD Goods Section IV: Bidding Forms',
    legalReference: 'सार्वजनिक खरिद ऐन दफा १४ र खरिद नियमावली नियम ३१ख',
    description: 'सवारी साधन, कम्प्युटर, मेशिनरी, प्रयोगशाला उपकरण तथा ब्रान्डेड मालसामान खरिदमा उत्पादक वा आधिकारिक वितरकले बोलपत्रदातालाई सामान आपूर्ति गर्न प्रदान गर्ने अनिवार्य आधिकारिकता पत्र।',
    applicableMethods: ['ncb-goods', 'icb-goods', 'sealed-quotation-goods'],
    fields: [
      { key: 'date', label: 'जारी मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'स्वास्थ्य सेवा विभाग / आपूर्ति व्यवस्थापन महाशाखा', placeholder: 'निकायको नाम' },
      { key: 'entityAddress', label: 'निकायको ठेगाना', defaultValue: 'टेकु, काठमाडौँ', placeholder: 'ठेगाना' },
      { key: 'ifbNo', label: 'बोलपत्र आह्वान (IFB) नं.', defaultValue: 'DOHS/G/NCB-02/2083-84', placeholder: 'IFB नं.' },
      { key: 'goodsDescription', label: 'आपूर्ति हुने मालसामानको विवरण', defaultValue: 'डिजिटल एक्सरे मेशिन तथा अल्ट्रासाउन्ड उपकरणहरू', placeholder: 'सामानको नाम' },
      { key: 'manufacturerName', label: 'मूल उत्पादक कम्पनीको नाम', defaultValue: 'ग्लोबल हेल्थकेयर इक्विपमेन्ट इन्क.', placeholder: 'उत्पादक कम्पनी' },
      { key: 'manufacturerCountry', label: 'उत्पादकको देश र ठेगाना', defaultValue: 'टोकियो, जापान', placeholder: 'देश र ठेगाना' },
      { key: 'bidderName', label: 'अधिकृत बोलपत्रदाता (फर्म/कम्पनी)', defaultValue: 'नेपाल मेडिकल सप्लायर्स प्रा.लि.', placeholder: 'फर्मको नाम' },
      { key: 'warrantyPeriod', label: 'वारेन्टी तथा स्पेयर पार्ट्स अवधि', defaultValue: '३ (तीन) वर्ष पूर्ण वारेन्टी र ७ वर्ष स्पेयर पार्ट्स उपलब्धता', placeholder: 'अवधि' },
    ],
    contentTemplate: (p) => `MANUFACTURER'S AUTHORIZATION LETTER
(मूल उत्पादकको आधिकारिकता पत्र)

मिति (Date): ${p.date || '[जारी मिति]'}

To:
The Office Chief / Procurement Officer,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'},
${p.entityAddress || '[निकायको ठेगाना]'}, Nepal.

Subject: Manufacturer's Authorization for Tender No. ${p.ifbNo || '[बोलपत्र नं.]'}

Respected Sir/Madam,

WHEREAS, we, ${p.manufacturerName || '[मूल उत्पादक कम्पनीको नाम]'}, who are official and reputable manufacturers of ${p.goodsDescription || '[मालसामानको नाम]'}, having our registered manufacturing factories and office at:
${p.manufacturerCountry || '[उत्पादकको ठेगाना र देश]'},

Do hereby officially authorize:
M/s ${p.bidderName || '[अधिकृत बोलपत्रदाताको नाम]'}
having registered office at [बोलपत्रदाताको ठेगाना], Nepal,

to submit a bid, negotiate and conclude the Contract with you against Tender Notice No: ${p.ifbNo || '[बोलपत्र नं.]'} for the supply, delivery, installation, testing, and commissioning of the above goods manufactured by us.

We hereby extend our full guarantee, comprehensive manufacturer's warranty, and technical support in accordance with the Conditions of Contract for the goods offered by the above firm against this Invitation for Bids:

१. पूर्ण वारेन्टी (Full Warranty): खरिद सम्झौता र बोलपत्र कागजात बमोजिम ${p.warrantyPeriod || 'न्यूनतम ३ वर्ष'} सम्म सामानमा कुनै उत्पादन वा प्राविधिक त्रुटि भएमा निःशुल्क मर्मत वा प्रतिस्थापन गर्ने पूर्ण जिम्मेवारी लिन्छौं।
२. स्पेयर पार्ट्स उपलब्धता (Spare Parts Availability): उक्त सामानको नियमित सञ्चालनका लागि आवश्यक पर्ने ओरिजिनल स्पेयर पार्ट्स र उपभोग्य सामग्रीहरू न्यूनतम ७ (सात) वर्षसम्म निरन्तर उपलब्ध गराउने प्रत्याभूति गर्दछौं।
३. सम्झौता पालना (Contract Fulfillment Guarantee): यदि उल्लेखित अधिकृत बिक्रेता/वितरकले काबु बाहिरको परिस्थिति वा अन्य कुनै कारणले सम्झौता बमोजिम सामान आपूर्ति गर्न असमर्थ भएमा, मूल उत्पादकको हैसियतले हामी आफैं वा अर्को अधिकृत प्रतिनिधि मार्फत उक्त सम्झौताका सम्पूर्ण दायित्वहरू पूर्ण रूपमा पूरा गर्ने प्रतिबद्धता व्यक्त गर्दछौं।
४. आधिकारिकताको निरन्तरता: यो आधिकारिकता पत्र यस बोलपत्र प्रक्रिया र तत्पश्चात् हुने सम्झौता कार्यान्वयन अवधिसम्म पूर्ण रूपमा मान्य रहनेछ।

Sincerely yours,

For and on behalf of: ${p.manufacturerName || '[मूल उत्पादक कम्पनी]'}

Signature: ____________________________________
Name: [अधिकृत अधिकारीको नाम]
Designation: [पद - Director / Global Sales Head]
Official Seal: [कम्पनीको आधिकारिक छाप]
Contact Email & Tel: [ईमेल र टेलिफोन]`,
  },

  // 16. क्याटलग सपिङ दरभाउ तथा छुट प्रस्ताव फाराम (Catalogue Shopping Price & Discount Offer)
  {
    id: 'form-catalogue-shopping',
    category: 'goods-services',
    categoryNepali: 'मालसामान तथा सेवा खरिद',
    titleNepali: 'क्याटलग सपिङ दरभाउ तथा छुट प्रस्ताव फाराम (Catalogue Shopping Price & Discount Offer)',
    titleEnglish: 'Catalogue Shopping Quotation & Discount Offer',
    sbdSection: 'PPMO Catalogue Shopping Guidelines & SBD Goods',
    legalReference: 'सार्वजनिक खरिद ऐन दफा ४१(क) र खरिद नियमावली नियम ८५(क)',
    description: 'सार्वजनिक निकायले क्याटलग सपिङ विधिबाट मालसामान खरिद गर्न आह्वान गर्दा उत्पादक वा आधिकारिक बिक्रेताले आधिकारिक मूल्य सूची र दिइने छुट प्रतिशत प्रस्ताव गर्ने ढाँचा।',
    applicableMethods: ['catalogue-shopping', 'direct-purchase'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'सडक विभाग / यान्त्रिक महाशाखा', placeholder: 'निकायको नाम' },
      { key: 'entityAddress', label: 'निकायको ठेगाना', defaultValue: 'चाकुपाट, ललितपुर', placeholder: 'ठेगाना' },
      { key: 'noticeNo', label: 'सूचीकरण/दरभाउ सूचना नं.', defaultValue: 'DOR/MECH/CAT/01-2083/84', placeholder: 'सूचना नं.' },
      { key: 'itemCategory', label: 'मालसामानको वर्ग/प्रकृति', defaultValue: 'हेभी इक्विपमेन्ट तथा सवारी साधन (स्काभेटर, लोडर र टिपर)', placeholder: 'सामानको वर्ग' },
      { key: 'bidderName', label: 'उत्पादक/आधिकारिक बिक्रेता', defaultValue: 'हिमालयन हेभी इक्विपमेन्ट प्रा.लि.', placeholder: 'कम्पनीको नाम' },
      { key: 'brandModel', label: 'ब्रान्ड र मोडल', defaultValue: 'KOMATSU PC-210-10M0 / ISUZU FVR', placeholder: 'ब्रान्ड र मोडल' },
      { key: 'discountPercent', label: 'प्रस्तावित छुट प्रतिशत (%)', defaultValue: '८.५०%', placeholder: 'छुट प्रतिशत' },
      { key: 'validityPeriod', label: 'प्रस्ताव मान्य अवधि', defaultValue: 'चालू आर्थिक वर्ष २०८३/०८४ भरि', placeholder: 'अवधि' },
    ],
    contentTemplate: (p) => `मिति: ${p.date || '[मिति]'}

श्रीमान् कार्यालय प्रमुखज्यू,
${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}
${p.entityAddress || '[निकायको ठेगाना]'}।

विषय: क्याटलग सपिङ (Catalogue Shopping) अन्तर्गत दरभाउ तथा छुट प्रस्ताव पेश गरिएको सम्बन्धमा।
(सूचना नं: ${p.noticeNo || '[सूचना नं.]'})

महोदय,

सार्वजनिक खरिद ऐन, २०६३ को दफा ४१ (क) तथा सार्वजनिक खरिद नियमावली, २०६४ को नियम ८५ (क) बमोजिम त्यस कार्यालयबाट प्रकाशित ${p.itemCategory || '[मालसामानको वर्ग]'} को क्याटलग सपिङ सूचीकरण तथा दरभाउ माग सम्बन्धी सूचनाको सन्दर्भमा, हामी आधिकारिक उत्पादक / राष्ट्रिय अधिकृत बिक्रेताको हैसियतले देहाय बमोजिमको विवरण, अद्यावधिक क्याटलग र प्रमाणित मूल्य सूची (Price List) सहित यो औपचारिक प्रस्ताव पेश गर्दछौं:

१. मालसामानको विवरण तथा ब्रान्ड:
   क) प्रस्तावित मालसामान: ${p.itemCategory || '[सामानको विवरण]'}
   ख) ब्रान्ड र मोडल: ${p.brandModel || '[ब्रान्ड र मोडल]'}
   ग) उत्पादक देश: [उत्पादक देश]
   घ) प्राविधिक स्पेसिफिकेसन: संलग्न आधिकारिक ब्रोसर/क्याटलग अनुसार।

२. मूल्य सूची र छुट प्रतिशत (Price List & Proposed Discount):
   क) मूल उत्पादकद्वारा प्रमाणित आधिकारिक मूल्य सूची (Official Published Price List): यसैसाथ संलग्न अनुसूची-१ बमोजिम।
   ख) क्याटलग मूल्यमा प्रस्तावित न्यूनतम छुट प्रतिशत: ${p.discountPercent || '[छुट प्रतिशत]'} (अक्षरमा: ___________________ प्रतिशत)।
   ग) कर तथा अन्य दस्तुर: नेपाल सरकारको नियमानुसार लाग्ने १३% मूल्य अभिवृद्धि कर (VAT) बाहेक।
   घ) ढुवानी तथा जडान: सार्वजनिक निकायको स्टोर / आयोजना स्थलसम्म निःशुल्क ढुवानी तथा जडान (DDP Site Delivery)।

३. कानूनी तथा सेवा सम्बन्धी प्रतिबद्धताहरू:
   क) मूल्य स्थिरता: यो प्रस्ताव र संलग्न क्याटलग मूल्य सूची ${p.validityPeriod || 'चालू आर्थिक वर्षभरि'} स्थिर रहनेछ र कुनै पनि अवस्थामा क्याटलग मूल्य बढाइने छैन। तर त्यस निकायले खरिद गर्दा थप परिमाणको आधारमा छुट प्रतिशत बढाउन सकिनेछ।
   ख) वारेन्टी तथा ग्यारेन्टी: आपूर्ति गरिएको सामानमा हस्तान्तरण भएको मितिले न्यूनतम १ (एक) वर्ष वा उत्पादकको मापदण्ड बमोजिम पूर्ण वारेन्टी र ३ पटकसम्म निःशुल्क सर्भिसिङ प्रदान गरिनेछ।
   ग) स्पेयर पार्ट्स उपलब्धता: आगामी ५ (पाँच) वर्षसम्म नियमित ओरिजिनल स्पेयर पार्ट्स र प्राविधिक सेवा निरन्तर उपलब्ध गराउने पूर्ण ग्यारेन्टी गर्दछौं।
   घ) डेलिभरी अवधि: खरिद आदेश (Purchase Order) प्राप्त भएको मितिले बढीमा ३० (तीस) दिनभित्र सामान आपूर्ति गरिसकिनेछ।

संलग्न कागजातहरू:
१. आधिकारिक उत्पादक/डिलरशिप प्रमाणपत्र प्रतिलिपि
२. कम्पनी दर्ता, स्थायी लेखा नम्बर (PAN/VAT) र आ.व. २०८२/८३ को कर चुक्ता प्रमाणपत्र
३. मूल उत्पादकको आधिकारिक क्याटलग तथा प्राविधिक ब्रोसर
४. आधिकारिक प्रमाणित मूल्य सूची (Schedule of Prices)

प्रस्ताव पेश गर्ने:
हस्ताक्षर: _________________________
अधिकृत व्यक्तिको नाम: [नाम र पद]
उत्पादक/विक्रेता: ${p.bidderName || '[कम्पनीको नाम]'}
ठेगाना र फोन नं: [ठेगाना र सम्पर्क]
(कम्पनीको आधिकारिक छाप)`,
  },

  // 17. प्राविधिक स्पेसिफिकेसन कम्प्लायन्स विवरण (Technical Specifications Compliance Sheet)
  {
    id: 'form-specs-compliance',
    category: 'goods-services',
    categoryNepali: 'मालसामान तथा सेवा खरिद',
    titleNepali: 'प्राविधिक स्पेसिफिकेसन कम्प्लायन्स विवरण (Technical Specifications Compliance Sheet)',
    titleEnglish: 'Technical Specifications Compliance Sheet - Goods',
    sbdSection: 'SBD Goods Section VII: Schedule of Requirements',
    legalReference: 'सार्वजनिक खरिद ऐन दफा १३ र नियमावली नियम २६',
    description: 'सार्वजनिक निकायको प्राविधिक स्पेसिफिकेसन बमोजिम बोलपत्रदाताले आफ्नो प्रस्तावित ब्रान्ड, मोडल, देश र क्याटलग पृष्ठ खुलाई पेश गर्ने प्राविधिक तालमेल विवरण।',
    applicableMethods: ['ncb-goods', 'icb-goods', 'sealed-quotation-goods'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'नेपाल विद्युत प्राधिकरण / वितरण तथा ग्राहक सेवा', placeholder: 'निकायको नाम' },
      { key: 'contractNo', label: 'ठेक्का/बोलपत्र नं.', defaultValue: 'NEA/DCS/2083-84/G-04', placeholder: 'ठेक्का नं.' },
      { key: 'goodsName', label: 'मालसामानको नाम', defaultValue: '११ केभी वितरण ट्रान्सफर्मरहरू (Distribution Transformers)', placeholder: 'सामानको नाम' },
      { key: 'bidderName', label: 'बोलपत्रदाता (फर्म/कम्पनी)', defaultValue: 'नेपाल ट्रान्सफर्मर एण्ड इलेक्ट्रिकल्स प्रा.लि.', placeholder: 'कम्पनीको नाम' },
      { key: 'offeredBrand', label: 'प्रस्तावित ब्रान्ड र देश', defaultValue: 'ABB / भारत तथा नेपाल', placeholder: 'ब्रान्ड र देश' },
      { key: 'offeredModel', label: 'प्रस्तावित मोडल/प्रकार', defaultValue: 'Oil Immersed, 100 kVA, Copper Wound', placeholder: 'मोडल' },
    ],
    contentTemplate: (p) => `TECHNICAL SPECIFICATIONS COMPLIANCE SHEET
(प्राविधिक स्पेसिफिकेसन कम्प्लायन्स विवरण)

मिति: ${p.date || '[मिति]'}
सार्वजनिक निकाय: ${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}
ठेक्का नं: ${p.contractNo || '[ठेक्का नं.]'}
सामानको नाम: ${p.goodsName || '[मालसामानको नाम]'}
बोलपत्रदाता: ${p.bidderName || '[बोलपत्रदाताको नाम]'}

प्रस्तावित ब्रान्ड तथा मोडल: ${p.offeredBrand || '[ब्रान्ड]'} / ${p.offeredModel || '[मोडल]'}

[निर्देशन: बोलपत्रदाताले प्राविधिक स्पेसिफिकेसनका प्रत्येक बुँदामा "Comply" मात्र नलेखी आफ्नो प्रस्तावित सामानको वास्तविक मापदण्ड र संलग्न क्याटलगको पृष्ठ नम्बर अनिवार्य उल्लेख गर्नुपर्छ।]

┌─────┬────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────┬───────────────┐
│ क्र. │ निकायको माग स्पेसिफिकेसन│ प्रस्तावित वास्तविक मापदण्ड │ तालमेल (Compliance)      │ क्याटलग/ब्रोसर│ कैफियत/विचलन  │
│ सं. │ (Required Specification)│ (Offered Specification)  │ (Comply / Non-Comply)    │ को पृष्ठ नं. │ (Deviations)  │
├─────┼────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────┼───────────────┤
│ १   │ क्षमता (Rating):       │ 100 kVA, 3-Phase,        │ Comply                   │ Page 4,      │ माग अनुसार पूर्ण│
│     │ 100 kVA, 11/0.4 kV     │ 11/0.4 kV, 50 Hz         │                          │ Clause 2.1   │ मिल्ने         │
├─────┼────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────┼───────────────┤
│ २   │ वाउन्ड सामग्री:        │ 99.9% Electrolytic       │ Comply                   │ Page 5,      │ माग अनुसार पूर्ण│
│     │ 100% Pure Copper       │ Grade Pure Copper        │                          │ Material Sec │ मिल्ने         │
├─────┼────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────┼───────────────┤
│ ३   │ नो-लोड नोक्सानी        │ Max 220 Watts (at rated  │ Comply                   │ Page 7,      │ तोकिएको सीमा  │
│     │ (No-Load Loss): Max 260W│ voltage & frequency)    │                          │ Test Report  │ भन्दा पनि उत्कृष्ट│
├─────┼────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────┼───────────────┤
│ ४   │ शीतलन प्रणाली (Cooling):│ ONAN (Oil Natural        │ Comply                   │ Page 6,      │ माग अनुसार पूर्ण│
│     │ ONAN Type              │ Air Natural)             │                          │ Tech Spec    │ मिल्ने         │
├─────┼────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────┼───────────────┤
│ ५   │ गुणस्तर मानक (Standard):│ IEC 60076 / NS 228:2045  │ Comply (Certificate      │ Page 12-14,  │ ISO तथा NS   │
│     │ IEC 60076 or NS        │ certified by accredited) │                          │ Certificates │ प्रमाणपत्र संलग्न│
├─────┼────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────┼───────────────┤
│ ६   │ वारेन्टी तथा ग्यारेन्टी: │ 36 Months from date of   │ Comply                   │ Page 18,     │ पूर्ण ३ वर्षे  │
│     │ Min 24 Months          │ final commissioning      │                          │ Warranty Sec │ वारेन्टी       │
└─────┴────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────┴───────────────┘

घोषणा:
हामी यो प्रमाणित गर्दछौं कि माथि उल्लेखित तालिकामा पेश गरिएका सम्पूर्ण प्राविधिक विवरणहरू सत्य र तथ्यपरक छन्। यदि मूल्याङ्कनको क्रममा कुनै विवरण गलत, अधुरो वा बोलपत्र कागजातको अनिवार्य मापदण्ड विपरित पाइएमा हाम्रो बोलपत्र कानून बमोजिम अस्वीकृत भएमा हाम्रो कुनै दाबी रहने छैन।

अधिकृत हस्ताक्षर: _________________________
नाम: [अधिकृत प्रतिनिधिको नाम]
पद: [पद]
कम्पनी: ${p.bidderName || '[बोलपत्रदाता कम्पनी]'}
(कम्पनीको छाप)`,
  },

  // 18. परामर्शदाताको कार्यविधि तथा कार्यतालिका ढाँचा (Approach, Methodology & Work Plan - TECH-4)
  {
    id: 'form-consultant-approach',
    category: 'goods-services',
    categoryNepali: 'मालसामान तथा सेवा खरिद',
    titleNepali: 'परामर्शदाताको कार्यविधि तथा कार्यतालिका ढाँचा (Approach, Methodology & Work Plan)',
    titleEnglish: 'Technical Proposal Standard Form TECH-4',
    sbdSection: 'SBD RFP Section IV: Technical Proposal Standard Forms',
    legalReference: 'सार्वजनिक खरिद ऐन दफा ३१ र नियमावली नियम ७२',
    description: 'परामर्श सेवाको RFP प्राविधिक प्रस्तावमा कार्य सम्पादन गर्ने प्राविधिक दृष्टिकोण, विस्तृत कार्यविधि, कार्यतालिका र जनशक्ति परिचालन तालिका पेश गर्ने ढाँचा।',
    applicableMethods: ['consulting-qcbs', 'consulting-lcs', 'consulting-qbs'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'procuringEntity', label: 'सार्वजनिक निकायको नाम', defaultValue: 'भौतिक पूर्वाधार तथा यातायात मन्त्रालय / सडक विभाग', placeholder: 'निकायको नाम' },
      { key: 'contractNo', label: 'परामर्श सेवा RFP नं.', defaultValue: 'DOR/RFP/CS-03/2083-84', placeholder: 'RFP नं.' },
      { key: 'assignmentName', label: 'परामर्श कार्यको नाम', defaultValue: 'रणनीतिक सडक सञ्जालको विस्तृत सम्भाव्यता अध्ययन तथा विस्तृत इन्जिनियरिङ डिजाइन', placeholder: 'परामर्श कार्य' },
      { key: 'consultantName', label: 'परामर्शदाता (कन्सल्टेन्सी/JV)', defaultValue: 'नेपाल इन्जिनियरिङ कन्सल्ट्यान्ट्स प्रा.लि. - एभरेष्ट इन्फ्रा जेभी', placeholder: 'परामर्शदाता' },
      { key: 'studyDuration', label: 'कार्य सम्पन्न अवधि (महिना)', defaultValue: '६ (छ) महिना', placeholder: 'अवधि' },
    ],
    contentTemplate: (p) => `TECHNICAL PROPOSAL - FORM TECH-4
(कार्यविधि, दृष्टिकोण र कार्यतालिका)

मिति: ${p.date || '[मिति]'}
सार्वजनिक निकाय: ${p.procuringEntity || '[सार्वजनिक निकायको नाम]'}
RFP नं: ${p.contractNo || '[RFP नं.]'}
परामर्श कार्य: ${p.assignmentName || '[परामर्श कार्यको नाम]'}
परामर्शदाता: ${p.consultantName || '[परामर्शदाताको नाम]'}

प्रस्तावित कार्य सम्पादन गर्ने प्राविधिक दृष्टिकोण, कार्यविधि र कार्यतालिका देहायका ३ मुख्य खण्डमा प्रस्तुत गरिएको छ:

क) प्राविधिक दृष्टिकोण र कार्यविधि (Technical Approach and Methodology):
१. TOR (Terms of Reference) को बुझाइ: यस आयोजनाको मुख्य उद्देश्य रणनीतिक सडक सञ्जालको भौगोलिक, वातावरणीय, ट्राफिक तथा सामाजिक पक्षहरूको विस्तृत विश्लेषण गरी अन्तर्राष्ट्रिय मापदण्ड बमोजिमको सम्भाव्यता तथा डिजाइन प्रतिवेदन तयार गर्नु हो।
२. तथ्याङ्क संकलन विधि: भू-उपग्रह (GIS/Remote Sensing), ड्रोन सर्भे (Drone Survey), सडक ट्राफिक गणना (Traffic Count), माटो परीक्षण (Geotechnical Drilling), र स्थानीय सरोकारवालाहरूसँग सार्वजनिक परामर्श (Public Consultation) गरिनेछ।
३. इन्जिनियरिङ डिजाइन सफ्टवेयर: सिभिल थ्रीडी (AutoCAD Civil 3D), MX Road, SW_DTM र ब्रिज डिजाइनका लागि MIDAS/STAAD-Pro को प्रयोग गरी शून्य त्रुटिरहित डिजिटल मोडल तयार गरिनेछ।
४. वातावरणीय तथा सामाजिक परीक्षण: नेपाल सरकारको EPR 2077 र सार्वजनिक खरिद मापदण्ड अनुसार IEE/EIA प्रतिवेदन तयार गरिनेछ।

ख) विस्तृत कार्ययोजना (Work Plan & Milestone Schedule):
कुल अवधि: ${p.studyDuration || '६ महिना'}
- महिना १: Inception Report, फिल्ड सर्भे टोली परिचालन, प्रारम्भिक अध्ययन।
- महिना २-३: Topographical Survey, Geotechnical Investigations, Traffic Studies।
- महिना ४: Interim Report पेश, सरोकारवालाहरूको कार्यशाला (Stakeholder Workshop)।
- महिना ५: Draft Detailed Design, Cost Estimation, Rate Analysis & Draft Tender Documents।
- महिना ६: Final Detailed Project Report (DPR) र अन्तिम हस्तान्तरण।

ग) संगठन संरचना र जनशक्ति परिचालन तालिका (Organization and Staffing):
- टिम लिडर / सिनियर हाइवे इन्जिनियर: सम्पूर्ण प्राविधिक समन्वय, प्रतिवेदन तयारी तथा गुणस्तर नियन्त्रण (६ महिना समर्पित)।
- सिनियर ब्रिज / स्ट्रक्चरल इन्जिनियर: पुल तथा कल्भर्ट संरचना डिजाइन (४ महिना समर्पित)।
- जियोटेक्निकल इन्जिनियर: माटो परीक्षण तथा जग डिजाइन (३ महिना समर्पित)।
- हाइडोलोजिस्ट / ड्रेनेज इन्जिनियर: जलप्रवाह र निकास डिजाइन (२ महिना समर्पित)।
- वातावरणीय तथा सामाजिक विकास विज्ञ: IEE/EIA तथा पुनर्वास योजना (३ महिना समर्पित)।
- प्रोक्योरमेन्ट तथा कस्ट स्पेसिअलिस्ट: परिमाण लागत अनुमान (BOQ) र SBD बिडिङ डकुमेन्ट तयारी (२ महिना)।

प्रस्तुतकर्ता:
हस्ताक्षर: _________________________
अधिकृत प्रतिनिधि: [नाम र पद]
परामर्शदाता: ${p.consultantName || '[परामर्शदाता फर्म/कम्पनी]'}
(फर्मको छाप)`,
  },

  // 19. मुख्य विज्ञको व्यक्तिगत विवरण तथा प्रतिबद्धता ढाँचा (Key Expert CV & Commitment - TECH-6)
  {
    id: 'form-key-expert-cv',
    category: 'goods-services',
    categoryNepali: 'मालसामान तथा सेवा खरिद',
    titleNepali: 'मुख्य विज्ञको व्यक्तिगत विवरण तथा प्रतिबद्धता ढाँचा (Key Expert CV & Commitment)',
    titleEnglish: 'Curriculum Vitae (CV) for Proposed Key Experts (TECH-6)',
    sbdSection: 'SBD RFP Section IV: Technical Proposal Standard Forms',
    legalReference: 'सार्वजनिक खरिद नियमावली नियम ७२ र ७३',
    description: 'परामर्श सेवामा प्रस्ताव गरिने मुख्य विज्ञहरूको शैक्षिक योग्यता, अनुभव, सक्कल हस्ताक्षर र यस आयोजनामा मात्र समर्पित रहने (Exclusivity & Availability) स्व-घोषणा फाराम।',
    applicableMethods: ['consulting-qcbs', 'consulting-lcs', 'consulting-qbs'],
    fields: [
      { key: 'date', label: 'मिति', defaultValue: '२०८३/०१/१५', placeholder: 'मिति' },
      { key: 'expertName', label: 'विज्ञको पूरा नाम', defaultValue: 'इन्जिनियर राजेन्द्र प्रसाद अधिकारी', placeholder: 'विज्ञको नाम' },
      { key: 'proposedPosition', label: 'प्रस्तावित पद/जिम्मेवारी', defaultValue: 'Team Leader / Senior Highway Engineer', placeholder: 'पद' },
      { key: 'necNo', label: 'नेपाल इन्जिनियरिङ काउन्सिल दर्ता नं.', defaultValue: 'NEC Reg. No: 4520 Civil "A"', placeholder: 'NEC नं.' },
      { key: 'qualification', label: 'उच्चतम शैक्षिक योग्यता', defaultValue: 'M.Sc. in Transportation Engineering (पुलचोक क्याम्पस, त्रिवि)', placeholder: 'योग्यता' },
      { key: 'totalExpYears', label: 'कुल कार्यानुभव (वर्ष)', defaultValue: '१८ वर्ष', placeholder: 'वर्ष' },
      { key: 'consultantName', label: 'प्रस्ताव गर्ने परामर्शदाता फर्म', defaultValue: 'ग्लोबल कन्सल्ट्यान्ट्स प्रा.लि.', placeholder: 'परामर्शदाता' },
      { key: 'assignmentName', label: 'परामर्श कार्यको नाम', defaultValue: 'सडक स्तरोन्नति आयोजनाको विस्तृत सम्भाव्यता अध्ययन', placeholder: 'आयोजनाको नाम' },
    ],
    contentTemplate: (p) => `CURRICULUM VITAE (CV) FOR PROPOSED KEY EXPERTS (FORM TECH-6)
(प्रस्तावित मुख्य विज्ञको व्यक्तिगत विवरण तथा प्रतिबद्धता फाराम)

१. व्यक्तिगत विवरण (General Information):
   क) विज्ञको पूरा नाम: ${p.expertName || '[विज्ञको नाम]'}
   ख) जन्म मिति तथा राष्ट्रियता: [मिति], नेपाली
   ग) पेशागत काउन्सिल दर्ता: ${p.necNo || '[काउन्सिल दर्ता नं.]'}
   घ) प्रस्तावित पद: ${p.proposedPosition || '[प्रस्तावित पद]'}
   ङ) कुल पेशागत अनुभव: ${p.totalExpYears || '[कुल अनुभव]'}
   च) परामर्शदाता फर्म: ${p.consultantName || '[फर्मको नाम]'}
   छ) परामर्श कार्य: ${p.assignmentName || '[परामर्श कार्य]'}

२. शैक्षिक योग्यता (Education):
   - ${p.qualification || '[उच्चतम शैक्षिक योग्यता]'} (प्राप्त वर्ष: २००८)
   - B.E. in Civil Engineering, त्रिभुवन विश्वविद्यालय (प्राप्त वर्ष: २००४)

३. तालिम तथा सदस्यता (Training & Professional Memberships):
   - नेपाल इन्जिनियर्स एसोसिएसन (NEA) आजीवन सदस्य (Life Member # 12450)
   - FIDIC Contract Management and Procurement Training (PPMO / WB)

४. सम्बन्धित मुख्य कार्यानुभव (Relevant Experience in Similar Assignments):
   [विगत ५-१० वर्षमा सम्पन्न गरिएका समान प्रकृतिका प्रमुख आयोजनाहरू]:
   क) आयोजना: काठमाडौँ-तराई द्रुतमार्ग जोड्ने फिडर सडक डिजाइन (अवधि: २०८०-२०८१)
      भूमिका: Team Leader / Highway Specialist
      कामको विवरण: सडक रेखाङ्कन, ट्राफिक अध्ययन, इन्जिनियरिङ प्रतिवेदन तयारी।
   ख) आयोजना: मध्यपहाडी लोकमार्ग खण्डको विस्तृत आयोजना प्रतिवेदन (DPR) (अवधि: २०७७-२०७९)
      भूमिका: Senior Road Design Engineer
      कामको विवरण: ज्यामितीय डिजाइन, लागत अनुमान र बिडिङ कागजात तयारी।

५. मुख्य विज्ञको कानूनी प्रतिबद्धता तथा स्व-घोषणा (Certification & Exclusivity Statement):
[सार्वजनिक खरिद नियमावलीको नियम ७२ र ७३ बमोजिम विज्ञ स्वयंले अनिवार्य हस्ताक्षर गर्नुपर्ने स्व-घोषणा]

म, निम्न हस्ताक्षरकर्ता ${p.expertName || '[विज्ञको नाम]'}, यो प्रमाणित गर्दछु कि:
१. मेरो व्यक्तिगत ज्ञान र विश्वास अनुसार माथि उल्लेखित मेरा शैक्षिक योग्यता, अनुभव र विवरणहरू पूर्ण रूपमा सत्य, तथ्यपरक र सही छन्।
२. मैले यस ${p.assignmentName || '[परामर्श कार्य]'} का लागि केवल ${p.consultantName || '[परामर्शदाता फर्म]'} लाई मात्र मेरो बायोडाटा (CV) प्रयोग गर्न आधिकारिक स्वीकृति दिएको छु (Exclusivity)।
३. मैले यसै खरिद प्रक्रियामा भाग लिने अन्य कुनै पनि प्रतिस्पर्धी परामर्शदाता फर्म वा संयुक्त उपक्रम (JV) मा मेरो CV पेश गर्न सहमति दिएको छैन।
४. यदि यो प्रस्ताव स्वीकृत भएमा, म कार्यतालिका बमोजिम यस आयोजनाको सम्पूर्ण अवधिभर फिल्ड तथा कार्यालयमा व्यक्तिगत रूपमा पूर्ण समय समर्पित रहनेछु (Availability)।
५. यदि मैले झुट्टा विवरण पेश गरेको वा दोहोरो फर्ममा CV दिएको प्रमाणित भएमा सार्वजनिक खरिद ऐन र प्रचलित कानून बमोजिम हुने कारबाही भोग्न म मञ्जुर छु।

विज्ञको सक्कल हस्ताक्षर: _________________________________
पूरा नाम: ${p.expertName || '[विज्ञको नाम]'}
मिति: ${p.date || '[मिति]'}
स्थान: काठमाडौँ, नेपाल

परामर्शदाता फर्मको अधिकृत प्रतिनिधिको प्रमाणीकरण:
माथि उल्लेखित विज्ञ हाम्रो प्रस्ताव अनुसार कार्य गर्न उपलब्ध रहने र निजको व्यक्तिगत हस्ताक्षर सत्य भएको व्यहोरा प्रमाणित गर्दछौं।

फर्मको अधिकृत हस्ताक्षर: _________________________
नाम: [अधिकृत प्रतिनिधि]
पद: [प्रबन्ध निर्देशक]
(कम्पनीको छाप)`,
  },
];
