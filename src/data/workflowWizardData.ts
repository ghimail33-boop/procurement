export interface MilestoneTask {
  id: string;
  label: string;
  clauseRef: string;
  isMandatory: boolean;
}

export interface WorkflowMilestone {
  stepNo: number;
  titleNepali: string;
  titleEnglish: string;
  targetTimeline: string;
  legalBasis: string;
  tasks: MilestoneTask[];
  requiredDocs: string[];
  redFlags: string[];
  templateId?: string;
  templateLabel?: string;
}

export interface WorkflowPreset {
  id: string;
  methodId: string;
  title: string;
  methodName: string;
  defaultAmount: number;
  category: 'works' | 'goods' | 'consulting' | 'services' | 'user-committee';
  shortDesc: string;
}

export const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    id: 'ncb-works',
    methodId: 'ncb-works',
    title: 'रु ३ करोडको भवन/सडक निर्माण (NCB Works - राष्ट्रिय खुला बोलपत्र)',
    methodName: 'राष्ट्रिय खुला बोलपत्र (निर्माण कार्य)',
    defaultAmount: 30000000,
    category: 'works',
    shortDesc: 'रु २ करोड देखि ५ अर्ब सम्मको निर्माण कार्य, एकल चरण दुई खाम, ३०% घटी कबोल कट-अफ र औसत अङ्क नजिकको विधि।',
  },
  {
    id: 'ncb-goods',
    methodId: 'ncb-goods',
    title: 'रु ५० लाखको यन्त्र उपकरण तथा सवारी खरिद (NCB Goods)',
    methodName: 'राष्ट्रिय खुला बोलपत्र (मालसामान)',
    defaultAmount: 5000000,
    category: 'goods',
    shortDesc: 'रु २० लाख भन्दा माथिको मालसामान, २१ दिने राष्ट्रिय सूचना, MAF वारेन्टी र स्वदेशी उत्पादनलाई १५% प्राथमिकता।',
  },
  {
    id: 'two-envelope',
    methodId: 'two-envelope',
    title: 'रु १२ करोडको अस्पताल पूर्वाधार निर्माण (Two-Envelope Bidding)',
    methodName: 'दुई खाम प्रणाली (Single Stage Two Envelope)',
    defaultAmount: 120000000,
    category: 'works',
    shortDesc: 'रु २ करोड माथिका काम, प्राविधिक र आर्थिक प्रस्ताव अलग-अलग खाममा पेस र मूल्याङ्कन गरिने विधि।',
  },
  {
    id: 'sealed-quotation',
    methodId: 'sealed-quotation',
    title: 'रु १८ लाखको सडक मर्मत तथा स्तरोन्नति (Sealed Quotation)',
    methodName: 'सिलबन्दी दरभाउपत्र (SQ)',
    defaultAmount: 1800000,
    category: 'works',
    shortDesc: 'रु २० लाख सम्मको निर्माण वा मालसामान (औषधिमा ५० लाख सम्म), कम्तीमा ७ दिने सूचना र ३ वटा दरभाउपत्र अनिवार्य।',
  },
  {
    id: 'direct-procurement',
    methodId: 'direct-procurement',
    title: 'रु १२ लाखको कार्यालय कम्प्युटर तथा फर्निचर (Direct Purchase)',
    methodName: 'सोझै खरिद (Direct Purchase)',
    defaultAmount: 1200000,
    category: 'goods',
    shortDesc: '१५ लाख सम्मको मालसामान वा निर्माण (१ लाख माथि ३ वटा कोटेसन), ५ लाख सम्म मर्मत वा परामर्श सेवा।',
  },
  {
    id: 'user-committee',
    methodId: 'user-committee',
    title: 'रु ७५ लाखको खानेपानी तथा सिँचाइ योजना (उपभोक्ता समिति)',
    methodName: 'उपभोक्ता समिति वा लाभग्राही समुदायबाट निर्माण',
    defaultAmount: 7500000,
    category: 'user-committee',
    shortDesc: 'रु १ करोड सम्मको जनसहभागितामूलक कार्य, हेभी मेसिनरी र ठेकेदार निषेध, सार्वजनिक सुनुवाइ र सामाजिक लेखापरीक्षण।',
  },
  {
    id: 'consulting-qcbs',
    methodId: 'consulting-qcbs',
    title: 'रु ५० लाखको विस्तृत इन्जिनियरिङ अध्ययन तथा DPR (QCBS Consulting)',
    methodName: 'परामर्श सेवा खरिद (गुणस्तर र लागत विधि - QCBS)',
    defaultAmount: 5000000,
    category: 'consulting',
    shortDesc: 'EOI सूचना, ३-६ वटा सर्टलिस्टिङ, RFP जारी, प्राविधिक (८०%) र आर्थिक (२०%) प्रस्ताव मूल्याङ्कन र TOR वार्ता।',
  },
  {
    id: 'gem-marketplace',
    methodId: 'gem-marketplace',
    title: 'रु २५ लाखको IT उपकरण तथा फर्निचर खरिद (GeM)',
    methodName: 'सरकारी ई-मार्केटप्लेस (Government E-Marketplace - GeM)',
    defaultAmount: 2500000,
    category: 'goods',
    shortDesc: 'PPMO को GeM पोर्टलबाट १० लाखसम्म एकल, २० लाखसम्म ३ दरभाउ, वा ५० लाखसम्म रिभर्स अक्सनबाट द्रुत खरिद।',
  },
  {
    id: 'catalog-shopping',
    methodId: 'catalog-shopping',
    title: 'रु ९५ लाखको फोर-ह्वील ड्राइभ पिकअप गाडी / औजार (क्याटलग सपिङ)',
    methodName: 'उत्पादक वा अधिकृत विक्रेता दरमा (क्याटलग सपिङ)',
    defaultAmount: 9500000,
    category: 'goods',
    shortDesc: 'हेभी इक्विपमेन्ट, गाडी वा स्वास्थ्य यन्त्रमा ७-१५ दिनको सूचना, क्याटलग सार्वजनिक दरमा अधिकतम छुट प्रतिस्पर्धा।',
  },
  {
    id: 'force-account',
    methodId: 'force-account',
    title: 'रु ८ लाखको आकस्मिक बाढीपहिरो सडक मर्मत कार्य (अमानत)',
    methodName: 'अमानतबाट निर्माण कार्य (Force Account)',
    defaultAmount: 800000,
    category: 'works',
    shortDesc: 'लागत अनुमान तयार गर्न कठिन नियमित मर्मत वा विपद्मा १ तह माथिको स्वीकृति लिई ज्यालादारीमा गराइने काम।',
  },
  {
    id: 'epc-turnkey',
    methodId: 'epc-turnkey',
    title: 'रु ४५ करोडको आधुनिक पुल / फ्लाइओभर निर्माण (EPC Turnkey)',
    methodName: 'ई.पी.सी. (EPC), डिजाइन र निर्माण, टर्नकी सम्झौता',
    defaultAmount: 450000000,
    category: 'works',
    shortDesc: 'जटिल संरचनामा डिजाइन, निर्माण र ५ वर्षे DLP सहितको एकमुष्ट Lump Sum ठेक्का, प्राविधिक/आर्थिक ५०-५० अङ्कभार।',
  },
  {
    id: 'ngo-procurement',
    methodId: 'ngo-procurement',
    title: 'रु ९ लाख ५० हजारको समुदाय जनचेतना तथा तालिम (NGO Procurement)',
    methodName: 'गैरसरकारी संस्थाबाट काम गराउने (NGO Procurement)',
    defaultAmount: 950000,
    category: 'services',
    shortDesc: 'रु १० लाख सम्मको जनचेतना, सामाजिक परिचालनमा मौजुदा सूचीका दर्तावाल NGO हरूबाट १५ दिने प्रस्ताव आह्वान।',
  },
  {
    id: 'rent-service',
    methodId: 'rent-service',
    title: 'रु १२ लाख/वर्षको कार्यालय भवन भाडा तथा सुरक्षा सेवा करार',
    methodName: 'घरजग्गा भाडा तथा सेवा करार (House Rent & Service Contract)',
    defaultAmount: 1200000,
    category: 'services',
    shortDesc: 'सीडीओ घरभाडा निर्धारण समिति दरमा भाडा; १० लाख सम्म सेवा करार वार्ता र माथि १५ दिने राष्ट्रिय सूचना।',
  },
];

export const METHOD_WORKFLOWS: Record<string, WorkflowMilestone[]> = {
  // 1. NCB Works (राष्ट्रिय खुला बोलपत्र - निर्माण)
  'ncb-works': [
    {
      stepNo: 1,
      titleNepali: 'खरिद पूर्वतयारी, विस्तृत सर्भे तथा लागत अनुमान स्वीकृति',
      titleEnglish: 'Procurement Planning & Cost Estimate Approval',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नुपूर्व (कम्तीमा १५-३० दिन अगावै)',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४क, ५, नियमावली नियम ६, ७, ८, ११, १२, १४',
      tasks: [
        { id: 'ncb-w-1-1', label: 'वार्षिक खरिद गुरुयोजना वा वार्षिक खरिद योजनामा समावेश भएको रुजु गर्ने', clauseRef: 'ऐन दफा ७, नियम ८', isMandatory: true },
        { id: 'ncb-w-1-2', label: 'जग्गा प्राप्ति, रुख कटान, मुआब्जा बजेट र वातावरणीय अध्ययन (IEE/EIA) स्वीकृति सुनिश्चित गर्ने', clauseRef: 'ऐन दफा ४क', isMandatory: true },
        { id: 'ncb-w-1-3', label: 'विस्तृत साइट सर्भे, माटो परीक्षण तथा स्ट्रक्चरल डिजाइन सम्पन्न गर्ने', clauseRef: 'नियम ६', isMandatory: true },
        { id: 'ncb-w-1-4', label: 'सम्बन्धित मन्त्रालय/विभागको स्वीकृत नर्म्स र जिल्ला दररेट अनुसार दर परिमाण सूची (BOQ) निकाल्ने', clauseRef: 'नियम ७, ११, १२', isMandatory: true },
        { id: 'ncb-w-1-5', label: 'अधिकार प्राप्त अधिकारीबाट नियम १४ बमोजिम लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम १४', isMandatory: true },
        { id: 'ncb-w-1-6', label: 'प्रतिस्पर्धा छल्न खरिदलाई टुक्रा-टुक्रा (Splitting) नगरिएको सुनिश्चित गर्ने', clauseRef: 'ऐन दफा ८(२)', isMandatory: true },
      ],
      requiredDocs: [
        'विस्तृत इन्जिनियरिङ नक्सा तथा ड्रइङ',
        'दर विश्लेषण (Rate Analysis Sheet)',
        'दर परिमाण सूची (BOQ)',
        'जिल्ला दररेट निर्धारण समितिको निर्णय प्रतिलिपि',
        'जग्गा प्राप्ति र वातावरणीय अध्ययन (IEE/EIA) स्वीकृति पत्र',
        'लागत अनुमान स्वीकृत टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'बजेट व्यवस्था नभई र साइट उपलब्ध नभई बोलपत्र आह्वान गर्न सख्त निषेध छ (ऐन दफा ४क)।',
        'सार्वजनिक खरिद ऐनको दफा ८(२) विपरीत खरिदलाई टुक्रा पार्नु गम्भीर आर्थिक अनुशासन उल्लंघन र बेरुजु मानिन्छ।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'मानक बोलपत्र कागजात (SBD) तयारी तथा बोलपत्र आह्वान',
      titleEnglish: 'SBD Preparation & Invitation for Bids (IFB)',
      targetTimeline: 'सूचना प्रकाशन मिति (कम्तीमा २१ दिनको म्याद)',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा १४, नियमावली नियम ३१, ३१ङ, ४९, ६५',
      tasks: [
        { id: 'ncb-w-2-1', label: 'PPMO को पछिल्लो मानक बोलपत्र कागजात (SBD) प्रयोग गरी कागजात तयार गर्ने', clauseRef: 'ऐन दफा ४(२)', isMandatory: true },
        { id: 'ncb-w-2-2', label: 'रु २ करोड माथिका निर्माण कार्यमा अनिवार्य एकल चरण दुई खाम विधि तय गर्ने', clauseRef: 'नियम ३१क', isMandatory: true },
        { id: 'ncb-w-2-3', label: 'लागत अनुमानको २ देखि ३ प्रतिशतले हुन आउने बिड बन्ड (मान्य अवधि ९०/१२० दिन) निर्धारण गर्ने', clauseRef: 'ऐन दफा २१', isMandatory: true },
        { id: 'ncb-w-2-4', label: 'बोलपत्रदाताले ५ वटा भन्दा बढी चालू ठेक्का नरहेको स्वघोषणा माग गर्ने सर्त राख्ने', clauseRef: 'नियम ६५(४घ)', isMandatory: true },
        { id: 'ncb-w-2-5', label: 'राष्ट्रिय दैनिक समाचारपत्र तथा e-GP प्रणालीमा अनिवार्य कम्तीमा २१ दिनको सूचना प्रकाशित गर्ने', clauseRef: 'नियम ४९', isMandatory: true },
      ],
      requiredDocs: [
        'स्वीकृत मानक बोलपत्र कागजात (SBD)',
        'बोलपत्र आह्वान गर्ने स्वीकृत टिप्पणी तथा आदेश',
        'राष्ट्रिय दैनिक समाचारपत्रमा प्रकाशित सूचनाको कटिङ',
        'e-GP पोर्टलमा प्रकाशित सूचना र बिड डकुमेन्ट लिङ्क',
      ],
      redFlags: [
        'स्थानीय पत्रिकामा मात्र सूचना निकालेर e-GP मा नराख्नु वा म्याद २१ दिन भन्दा घटाउनु गैरकानूनी हुन्छ।',
        'कुनै खास फर्मलाई फाइदा पुग्ने गरी प्रतिस्पर्धा सीमित गर्ने प्रतिबन्धात्मक सर्त (Restrictive Specifications) राख्न पाइँदैन।',
      ],
      templateId: 'tmpl-ifb-ncb',
      templateLabel: 'बोलपत्र आह्वानको सूचनाको ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'प्रि-बिड बैठक, जिज्ञासा निरुपण तथा संशोधन (Addendum)',
      titleEnglish: 'Pre-Bid Meeting & Clarifications',
      targetTimeline: 'बोलपत्र पेस गर्ने अन्तिम मिति भन्दा कम्तीमा १० दिन अगावै',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ५०, नियम ५१',
      tasks: [
        { id: 'ncb-w-3-1', label: 'बोलपत्र पेस गर्ने अन्तिम म्याद भन्दा कम्तीमा १० दिन अगावै प्रि-बिड बैठक आयोजना गर्ने', clauseRef: 'नियम ५०', isMandatory: true },
        { id: 'ncb-w-3-2', label: 'उपस्थित निर्माण व्यवसायीहरूको जिज्ञासा, साइट कन्डिसन र प्राविधिक सर्तमा छलफल गर्ने', clauseRef: 'नियम ५०(२)', isMandatory: true },
        { id: 'ncb-w-3-3', label: 'प्रि-बिड बैठकको आधिकारिक माइन्युट (Minutes) तयार गरी e-GP मा अपलोड गर्ने', clauseRef: 'नियम ५०(३)', isMandatory: true },
        { id: 'ncb-w-3-4', label: 'कागजात संशोधन गर्नुपरेमा अन्तिम म्याद भन्दा कम्तीमा ७ दिन अगावै e-GP मा संशोधन अपलोड गर्ने', clauseRef: 'नियम ५१', isMandatory: true },
      ],
      requiredDocs: [
        'प्रि-बिड बैठक उपस्थिति पुस्तिका तथा निर्णयको माइन्युट',
        'e-GP प्रणालीमा अपलोड गरिएको जिज्ञासा स्पष्टीकरण प्रतिवेदन',
        'बोलपत्र कागजात संशोधन सूचना (Addendum Notice)',
      ],
      redFlags: [
        'प्रि-बिड बैठक आयोजना नै नगर्नु वा १० दिनको म्याद नपुर्‍याउनुले बोलपत्र रद्द वा पुनरावलोकन समितिबाट खारेज हुने जोखिम निम्त्याउँछ।',
        'अन्तिम म्याद सकिन ७ दिनभन्दा कम समय बाँकी छँदा बोलपत्र संशोधन गरेमा अनिवार्य रूपमा बोलपत्र पेस गर्ने म्याद थप गर्नुपर्छ (नियम ५१(२))।',
      ],
      templateId: 'tmpl-notesheet-ifb',
      templateLabel: 'बोलपत्र संशोधन तथा स्पष्टीकरण टिप्पणी ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'बोलपत्र दाखिला, अनलाइन खोल्ने प्रक्रिया र मुचुल्का',
      titleEnglish: 'Bid Submission, Online Opening & Minutes',
      targetTimeline: 'सूचना अनुसारको अन्तिम दिन (दिनको १२:०० बजे दाखिला बन्द, १:०० बजे खोल्ने)',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २२, नियमावली नियम ५९, नियम ६२',
      tasks: [
        { id: 'ncb-w-4-1', label: 'e-GP प्रणालीमा दिनको ठीक १२:०० बजे बोलपत्र दर्ता प्रणाली स्वतः बन्द भएको रुजु गर्ने', clauseRef: 'नियम ५८', isMandatory: true },
        { id: 'ncb-w-4-2', label: 'सोही दिन १:०० बजे उपस्थित बोलपत्रदाताका प्रतिनिधिहरूको रोहबरमा अनलाइन बिड खोल्ने', clauseRef: 'नियम ५९', isMandatory: true },
        { id: 'ncb-w-4-3', label: 'कबोल अङ्क, छुट प्रतिशत, बैंक जमानतको रकम र म्याद पढेर सुनाउने र मुचुल्का तयार गर्ने', clauseRef: 'नियम ६२', isMandatory: true },
        { id: 'ncb-w-4-4', label: 'बोलपत्र खोल्दाको बखत कुनै पनि बोलपत्र स्वीकृत वा अस्वीकृत नगर्ने (नियम ५९(५))', clauseRef: 'नियम ५९(५)', isMandatory: true },
      ],
      requiredDocs: [
        'e-GP बिड ओपनिङ सारांश प्रतिवेदन (System Generated Opening Report)',
        'उपस्थिति तथा बोलपत्र खोल्ने मुचुल्का (Opening Minutes)',
        'बैंक जमानत (बिड बन्ड) को सक्कल वा अनलाइन प्रमाणित प्रति',
      ],
      redFlags: [
        'खोल्ने समयमा कुनै कागजात पुगेन भन्दै प्रारम्भिक अवस्थामै बोलपत्र बहिस्कार वा अस्वीकृत गर्न पाइँदैन। त्यो मूल्याङ्कन समितिको क्षेत्राधिकार हो।',
      ],
      templateId: 'tmpl-bid-opening-minutes',
      templateLabel: 'बोलपत्र खोल्ने सार्वजनिक मुचुल्का ढाँचा',
    },
    {
      stepNo: 5,
      titleNepali: 'मूल्याङ्कन समितिद्वारा परीक्षण, ३०% घटी कबोल जाँच र आशयको सूचना (LOI)',
      titleEnglish: 'Bid Evaluation, 30% Cutoff & Letter of Intent (LOI)',
      targetTimeline: 'बोलपत्र खोलेको १५ देखि २१ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा १५, २५, २७, नियमावली नियम ६५, ६५च, ६६',
      tasks: [
        { id: 'ncb-w-5-1', label: 'सारभूत रूपमा प्रभावग्राही (Substantially Responsive) बोलपत्रहरूको सूची तयार गर्ने', clauseRef: 'नियम ६५', isMandatory: true },
        { id: 'ncb-w-5-2', label: '१६औँ संशोधन: लागत भन्दा ३०% भन्दा घटी कबोल भएको बोलपत्र स्वतः अस्वीकृत गर्ने', clauseRef: 'ऐन दफा २५(७ख), नियम ६५च', isMandatory: true },
        { id: 'ncb-w-5-3', label: '१६औँ संशोधन: सिफारिस फर्मको ५ वटा चालू खरिद सम्झौता सीमा e-GP विवरण रुजु गर्ने', clauseRef: 'नियम ६५(४घ)', isMandatory: true },
        { id: 'ncb-w-5-4', label: '१५% भन्दा घटेको कबोल भए ५% आधारभूत + थप ५०% अतिरिक्त कार्यसम्पादन जमानत हिसाब गर्ने', clauseRef: 'नियम ६५च', isMandatory: true },
        { id: 'ncb-w-5-5', label: 'मूल्याङ्कन प्रतिवेदन स्वीकृत गरी सफल फर्मको नाममा ७ (सात) दिने आशयको सूचना (LOI) प्रकाशित गर्ने', clauseRef: 'ऐन दफा २७(२), नियम ६६', isMandatory: true },
      ],
      requiredDocs: [
        'मूल्याङ्कन समितिको पूर्ण प्रतिवेदन (Technical & Financial Evaluation Report)',
        '५ वटा चालू ठेक्का परीक्षण रुजु फाराम',
        'अतिरिक्त कार्यसम्पादन जमानत हिसाब तालिका',
        'e-GP पोर्टल तथा कार्यालयमा प्रकाशित ७ दिने LOI सूचना',
      ],
      redFlags: [
        '३०% भन्दा बढी घटेको बोलपत्रलाई कुनै पनि बहानामा स्वीकृत गरेमा सिधै बेरुजु र अख्तियारको अनुसन्धान आकर्षित हुन्छ।',
        '७ दिने LOI सूचना प्रकाशित नगरी सिधै सम्झौता गरेमा ठेक्का बदरभागी हुन्छ र उजुरी परेमा सार्वजनिक निकाय हार्छ।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'मूल्याङ्कन प्रतिवेदन स्वीकृत तथा LOI सम्बन्धी टिप्पणी ढाँचा',
    },
    {
      stepNo: 6,
      titleNepali: 'कार्यसम्पादन जमानत दाखिला, स्वीकृति पत्र (LOA) र सम्झौता',
      titleEnglish: 'Letter of Acceptance (LOA) & Contract Agreement',
      targetTimeline: 'LOI सकिएको लगत्तै १५ दिनको म्याद दिई बोलाउने',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २७(३), दफा ५२, नियमावली नियम ६८, अनुसूची ३, ४, ८',
      tasks: [
        { id: 'ncb-w-6-1', label: '७ दिने LOI अवधिमा कुनै उजुरी नपरेको निश्चित गरी १५ दिने सम्झौता आह्वान पत्र (LOA) पठाउने', clauseRef: 'ऐन दफा २७(३), नियम ६८', isMandatory: true },
        { id: 'ncb-w-6-2', label: 'कबोल रकमको ५% (+ आवश्यक परे थप रकम) बराबरको मान्य कार्यसम्पादन जमानत बुझ्ने', clauseRef: 'ऐन दफा २७(४)', isMandatory: true },
        { id: 'ncb-w-6-3', label: 'निर्माण व्यवसायीको सामाजिक सुरक्षा कोष (SSF) मा श्रमिक आबद्धता प्रतिबद्धता रुजु गर्ने', clauseRef: 'ऐन दफा ५२ख', isMandatory: true },
        { id: 'ncb-w-6-4', label: 'तोकिएको ढाँचामा दुवै पक्षबाट खरिद सम्झौता पत्रमा आधिकारिक हस्ताक्षर र छाप लगाउने', clauseRef: 'ऐन दफा ५२, नियम २१', isMandatory: true },
        { id: 'ncb-w-6-5', label: 'कार्यस्थलमा नियम १११(१)(ज१) बमोजिम अनुसूची-८ को नागरिक सूचना पाटी अनिवार्य राख्न लगाउने', clauseRef: 'नियम १११, अनुसूची ८', isMandatory: true },
      ],
      requiredDocs: [
        'बोलपत्र स्वीकृति तथा सम्झौता आह्वान पत्र (LOA)',
        'सक्कल कार्यसम्पादन बैंक जमानत (Performance Guarantee)',
        'सामाजिक सुरक्षा कोष (SSF) सूचीकरण प्रमाण',
        'हस्ताक्षरित खरिद सम्झौता पत्र र दर परिमाण सूची (BOQ)',
        'कार्यस्थल सूचना पाटीको तस्बिर',
      ],
      redFlags: [
        '१५ दिनभित्र व्यवसायी सम्झौता गर्न नआएमा तत्काल ऐनको दफा २७(५) बमोजिम बिड बन्ड जफत गरी दोस्रो फर्मलाई बोलाउने वा कालोसूची प्रक्रिया अघि बढाउने।',
      ],
      templateId: 'tmpl-contract-agreement',
      templateLabel: 'सार्वजनिक खरिद सम्झौताको ढाँचा',
    },
    {
      stepNo: 7,
      titleNepali: 'मोबिलाइजेसन पेश्की, भेरिएसन, म्याद थप र कार्य सम्पन्न प्रतिवेदन',
      titleEnglish: 'Mobilization Advance, Variations, Extension & Completion',
      targetTimeline: 'सम्झौता प्रारम्भदेखि सम्पन्न र १ वर्षे DLP अवधि समाप्तिसम्म',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ५२क, ५४, ५६, नियमावली नियम ११३, ११८, १२०, १२५',
      tasks: [
        { id: 'ncb-w-7-1', label: 'बढीमा २०% मोबिलाइजेसन पेश्की बैंक जमानत विरुद्ध मात्र उपलब्ध गराउने', clauseRef: 'ऐन दफा ५२क, नियम ११३', isMandatory: true },
        { id: 'ncb-w-7-2', label: 'प्रत्येक रनिङ बिल भुक्तानी गर्दा ५% रिटेन्सन मनी र पेश्की कट्टा गर्ने', clauseRef: 'नियम १२३(४)', isMandatory: true },
        { id: 'ncb-w-7-3', label: 'अनपेक्षित साइट अवस्था फेरिएमा १५% सम्मको भेरिएसन तोकिएको अख्तियारीबाट स्वीकृत गराउने', clauseRef: 'ऐन दफा ५४, नियम ११८', isMandatory: true },
        { id: 'ncb-w-7-4', label: 'म्याद थपको निवेदन सम्झौता सकिनु भन्दा कम्तीमा २१ दिन अगावै दर्ता भएको रुजु गर्ने', clauseRef: 'नियम १२०(१)', isMandatory: true },
        { id: 'ncb-w-7-5', label: 'कार्य सम्पन्न भएपछि प्राविधिक नापजाँच गरी नियम १२५ बमोजिम कार्य सम्पन्न प्रमाणपत्र दिने', clauseRef: 'नियम १२५', isMandatory: true },
        { id: 'ncb-w-7-6', label: 'कम्तीमा १ वर्षको त्रुटि सच्याउने अवधि (DLP) सकिएपछि मात्र धरौटी रकम फिर्ता गर्ने', clauseRef: 'नियम १२३', isMandatory: true },
      ],
      requiredDocs: [
        'मोबिलाइजेसन पेश्की बैंक जमानत (Advance Bank Guarantee)',
        'नाप किताब (Measurement Book - MB) र रनिङ बिलहरू',
        'भेरिएसन आदेश टिप्पणी र स्वीकृत दर विश्लेषण',
        '२१ दिन अगावै दर्ता भएको म्याद थपको निवेदन र निर्णय',
        'कार्य सम्पन्न प्रमाणपत्र (Work Completion Certificate)',
      ],
      redFlags: [
        'सम्झौताको म्याद सकिन २१ दिनभन्दा कम समय बाँकी हुँदा परेको म्याद थप निवेदन स्वीकृत गरेमा सो म्याद थप गैरकानूनी ठहरिन्छ (नियम १२०)।',
        '१५% भन्दा बढीको भेरिएसन भएमा विभागीय प्रमुखको सट्टा मन्त्रालय वा मन्त्रिपरिषद् जानुपर्ने अख्तियारी सीमा ख्याल गर्नुहोस्।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'कार्य सम्पन्न प्रतिवेदन तथा प्रमाणपत्र ढाँचा',
    },
  ],

  // 2. NCB Goods (राष्ट्रिय खुला बोलपत्र - मालसामान)
  'ncb-goods': [
    {
      stepNo: 1,
      titleNepali: 'मालसामानको आवश्यकता यकिन, स्पेशिफिकेसन र लागत अनुमान स्वीकृति',
      titleEnglish: 'Goods Requirement, Specification & Cost Estimate Approval',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४, ५, नियमावली नियम ११, १४, ४२',
      tasks: [
        { id: 'ncb-g-1-1', label: 'स्टोरमा मौज्दात नरहेको यकिन गरी खरिद माग फाराम स्वीकृत गर्ने', clauseRef: 'नियम ५', isMandatory: true },
        { id: 'ncb-g-1-2', label: 'कुनै खास ब्रान्ड वा ट्रेडमार्क उल्लेख नगरी वस्तुगत प्राविधिक स्पेशिफिकेसन तयार गर्ने', clauseRef: 'ऐन दफा ४(३), नियम ४२', isMandatory: true },
        { id: 'ncb-g-1-3', label: 'स्वदेशी मालसामान (कम्तीमा ३०% मूल्य अभिवृद्धि) लाई १५% प्राथमिकता दिने प्रावधान राख्ने', clauseRef: 'नियम १७', isMandatory: true },
        { id: 'ncb-g-1-4', label: 'बजार दररेट वा अघिल्ला खरिद दरका आधारमा लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम ११, १४', isMandatory: true },
      ],
      requiredDocs: [
        'खरिद माग फाराम (Store Requisition Form)',
        'प्राविधिक स्पेशिफिकेसन (Technical Specifications)',
        'बजार दर विश्लेषण तथा लागत अनुमान (Cost Estimate)',
        'लागत अनुमान स्वीकृत टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'विशिष्ट ब्रान्ड मात्र मिल्ने गरी स्पेसिफिकेसन बनाउन पाइँदैन (ऐन दफा ४(३))। "सो सरह" (Equivalent) अनिवार्य लेख्नुपर्छ।',
        'ढुवानी, जडान (Installation), तालिम र वारेन्टीको लागत नछुटाउनुहोस्।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'मानक बोलपत्र कागजात (SBD) तयारी, निर्माता अख्तियारी (MAF) र सूचना',
      titleEnglish: 'Goods SBD, MAF & Invitation for Bids (IFB)',
      targetTimeline: 'कम्तीमा २१ दिनको म्याद',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा १४, नियमावली नियम ३१, ४९',
      tasks: [
        { id: 'ncb-g-2-1', label: 'PPMO को मालसामान सम्बन्धी मानक बोलपत्र कागजात (SBD) प्रयोग गर्ने', clauseRef: 'ऐन दफा ४(२)', isMandatory: true },
        { id: 'ncb-g-2-2', label: 'निर्माताको आधिकारिक अख्तियारी पत्र (MAF) र वारेन्टी सर्त समावेश गर्ने', clauseRef: 'नियम ४२', isMandatory: true },
        { id: 'ncb-g-2-3', label: 'लागतको २% देखि ३% बिड सेक्युरिटी (मान्य अवधि ९०/१२० दिन) निर्धारण गर्ने', clauseRef: 'ऐन दफा २१', isMandatory: true },
        { id: 'ncb-g-2-4', label: 'राष्ट्रिय दैनिक समाचारपत्र तथा e-GP पोर्टलमा कम्तीमा २१ दिनको सूचना प्रकाशन गर्ने', clauseRef: 'नियम ४९', isMandatory: true },
      ],
      requiredDocs: [
        'स्वीकृत मालसामान बोलपत्र कागजात (SBD)',
        'निर्माताको अधिकार पत्र ढाँचा (MAF Format)',
        'राष्ट्रिय दैनिकमा प्रकाशित सूचना कटिङ',
        'e-GP पोर्टल लिङ्क',
      ],
      redFlags: [
        'सूचनाको म्याद २१ दिन नपुर्‍याई बोलपत्र पेस गराउनु गैरकानूनी हुन्छ।',
      ],
      templateId: 'tmpl-ifb-ncb',
      templateLabel: 'बोलपत्र आह्वानको सूचनाको ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'बोलपत्र दाखिला, अनलाइन खोल्ने प्रक्रिया र मुचुल्का',
      titleEnglish: 'Bid Submission & Online Opening',
      targetTimeline: 'सूचना अनुसारको अन्तिम दिन (१२:०० बजे बन्द, १:०० बजे खोल्ने)',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २२, २३, नियमावली नियम ५९, ६२',
      tasks: [
        { id: 'ncb-g-3-1', label: 'e-GP मा १२:०० बजे दाखिला बन्द भई १:०० बजे सार्वजनिक रूपमा अनलाइन बिड खोल्ने', clauseRef: 'नियम ५९', isMandatory: true },
        { id: 'ncb-g-3-2', label: 'कबोल मूल्य, छुट, जमानत, ब्रान्ड/मोडेल विवरण पढेर सुनाई मुचुल्का तयार गर्ने', clauseRef: 'नियम ६२', isMandatory: true },
        { id: 'ncb-g-3-3', label: 'बोलपत्र खोल्दाको बखत कुनै पनि बोलपत्र स्वीकृत वा अस्वीकृत नगर्ने', clauseRef: 'नियम ५९(५)', isMandatory: true },
      ],
      requiredDocs: [
        'e-GP बिड खोल्ने प्रणाली प्रतिवेदन',
        'बोलपत्र खोल्ने सार्वजनिक मुचुल्का (Opening Minutes)',
        'बिड सेक्युरिटी भौचर/ग्यारेन्टी',
      ],
      redFlags: [
        'खोल्ने समयमा कागजात नपुगेको भन्दै प्रारम्भिक अवस्थामै बोलपत्र अस्वीकृत गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-bid-opening-minutes',
      templateLabel: 'बोलपत्र खोल्ने सार्वजनिक मुचुल्का ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'प्राविधिक परीक्षण, आर्थिक मूल्याङ्कन र आशयको सूचना (LOI)',
      titleEnglish: 'Technical Specification Compliance, Evaluation & LOI',
      targetTimeline: 'खोलेको १५ देखि २१ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २५, २७, नियमावली नियम ६२, ६४, ६६',
      tasks: [
        { id: 'ncb-g-4-1', label: 'स्पेशिफिकेसन compliance, MAF, वारेन्टी र क्याटलगको प्राविधिक परीक्षण गर्ने', clauseRef: 'नियम ६२', isMandatory: true },
        { id: 'ncb-g-4-2', label: 'स्वदेशी मालसामान भए १५% सम्म महँगो भए पनि खरिद प्राथमिकता गणना गर्ने', clauseRef: 'नियम १७', isMandatory: true },
        { id: 'ncb-g-4-3', label: 'सारभूत रूपमा प्रभावग्राही न्यूनतम मूल्याङ्कित बोलपत्र छनोट गर्ने', clauseRef: 'नियम ६४', isMandatory: true },
        { id: 'ncb-g-4-4', label: 'सफल बोलपत्रदाताको नाममा ७ (सात) दिने आशयको सूचना (LOI) प्रकाशित गर्ने', clauseRef: 'ऐन दफा २७(२), नियम ६६', isMandatory: true },
      ],
      requiredDocs: [
        'प्राविधिक स्पेशिफिकेसन तुलनात्मक तालिका (Compliance Sheet)',
        'निर्माता क्याटलग तथा ब्रोसर',
        'आर्थिक मूल्याङ्कन प्रतिवेदन (Financial Evaluation Report)',
        '७ दिने LOI सूचना',
      ],
      redFlags: [
        'स्पेसिफिकेसन नमिलेको वा MAF नभएको सामानलाई जबर्जस्ती पास गराउनु अख्तियारको छानबिनको विषय बन्छ।',
      ],
      templateId: 'tmpl-loi',
      templateLabel: 'आशयको सूचनाको ढाँचा (LOI)',
    },
    {
      stepNo: 5,
      titleNepali: 'सम्झौता आह्वान (LOA), ५% कार्यसम्पादन जमानत र खरिद सम्झौता',
      titleEnglish: 'Letter of Acceptance (LOA) & Contract',
      targetTimeline: 'LOI पश्चात् १५ दिनको म्याद',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २७(३), ५२, नियमावली नियम ६८',
      tasks: [
        { id: 'ncb-g-5-1', label: '७ दिने LOI अवधिमा उजुरी नपरेपछि १५ दिने सम्झौता आह्वान पत्र (LOA) पठाउने', clauseRef: 'ऐन दफा २७(३), नियम ६८', isMandatory: true },
        { id: 'ncb-g-5-2', label: 'कबोल अङ्कको ५% बराबरको कार्यसम्पादन बैंक जमानत बुझ्ने', clauseRef: 'ऐन दफा २७(४)', isMandatory: true },
        { id: 'ncb-g-5-3', label: 'डेलिभरी सेड्युल, ढुवानी, जडान र तालिम सर्तसहित खरिद सम्झौता सम्पन्न गर्ने', clauseRef: 'ऐन दफा ५२', isMandatory: true },
      ],
      requiredDocs: [
        'LOA सम्झौता आह्वान पत्र',
        '५% कार्यसम्पादन जमानत (Performance Guarantee)',
        'हस्ताक्षरित खरिद सम्झौता पत्र',
        'आपूर्ति तालिका (Delivery Schedule)',
      ],
      redFlags: [
        '१५ दिनभित्र सम्झौता गर्न नआए जमानत जफत गरी दोस्रो फर्मलाई बोलाउनुपर्छ।',
      ],
      templateId: 'tmpl-loa',
      templateLabel: 'बोलपत्र स्वीकृति तथा सम्झौता आह्वान पत्र (LOA)',
    },
    {
      stepNo: 6,
      titleNepali: 'सामान आपूर्ति, प्राविधिक निरीक्षण, जिन्सी दाखिला र भुक्तानी',
      titleEnglish: 'Delivery, Inspection, Store Entry (MSR) & Payment',
      targetTimeline: 'सम्झौता अनुसारको डेलिभरी अवधिभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ११५, १२३',
      tasks: [
        { id: 'ncb-g-6-1', label: 'तोकिएको मिति र स्थानमा सामान ढुवानी तथा आपूर्ति भएको यकिन गर्ने', clauseRef: 'नियम ११५', isMandatory: true },
        { id: 'ncb-g-6-2', label: 'प्राविधिक जाँच समिति गठन गरी स्पेशिफिकेसन अनुसार परीक्षण (Inspection) गर्ने', clauseRef: 'नियम ११५(२)', isMandatory: true },
        { id: 'ncb-g-6-3', label: 'जाँचपास पश्चात् स्टोर शाखाबाट जिन्सी दाखिला प्रतिवेदन (MSR) तयार गर्ने', clauseRef: 'नियम ११५(४)', isMandatory: true },
        { id: 'ncb-g-6-4', label: 'भ्याट बिल, वारेन्टी कार्ड र दाखिला प्रतिवेदनका आधारमा ३० दिनभित्र बिल भुक्तानी दिने', clauseRef: 'नियम १२३', isMandatory: true },
      ],
      requiredDocs: [
        'ढुवानी चलानी तथा डेलिभरी रिसिप्ट',
        'प्राविधिक निरीक्षण तथा परीक्षण प्रतिवेदन (Inspection Report)',
        'जिन्सी दाखिला प्रतिवेदन (MSR)',
        'भ्याट बिल तथा वारेन्टी कार्ड',
      ],
      redFlags: [
        'प्राविधिक जाँचपास र जिन्सी दाखिला नभई भुक्तानी दिएमा सिधै आर्थिक अनियमितता मानिन्छ।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'दाखिला तथा सम्पन्नता प्रमाणपत्र ढाँचा',
    },
  ],

  // 3. Two Envelope (दुई खाम प्रणाली)
  'two-envelope': [
    {
      stepNo: 1,
      titleNepali: 'पूर्वतयारी, योग्यता मापदण्ड निर्धारण र लागत अनुमान स्वीकृति',
      titleEnglish: 'Preparation, Qualification Criteria & Estimate Approval',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नुपूर्व',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ११(५), नियम ३१ज, १४',
      tasks: [
        { id: 'te-1-1', label: 'रु २ करोड माथिका निर्माण कार्य वा जटिल सेवामा दुई खाम विधि तय गर्ने', clauseRef: 'नियम ३१क, ३१ज', isMandatory: true },
        { id: 'te-1-2', label: 'विगत १० वर्षको न्यूनतम औसत वार्षिक कारोबार, विशिष्ट अनुभव र मुख्य जनशक्ति मापदण्ड तय गर्ने', clauseRef: 'नियम ३१ज', isMandatory: true },
        { id: 'te-1-3', label: 'स्वीकृत नर्म्स अनुसार विस्तृत लागत अनुमान अधिकार प्राप्त अधिकारीबाट स्वीकृत गर्ने', clauseRef: 'नियम १४', isMandatory: true },
      ],
      requiredDocs: [
        'प्राविधिक योग्यता मापदण्ड तालिका (Qualification Criteria)',
        'स्वीकृत लागत अनुमान तथा दर विश्लेषण',
        'विस्तृत नक्सा र ड्रइङ',
      ],
      redFlags: [
        'कुनै खास फर्मलाई मात्र मिल्ने गरी प्रतिबन्धात्मक योग्यता सर्त राख्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'दुई खाम बोलपत्र आह्वान सूचना (कम्तीमा २१ दिनको म्याद)',
      titleEnglish: 'Two-Envelope Bid Invitation Notice',
      targetTimeline: 'कम्तीमा २१ दिन (ICB भए ३० दिन)',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा १४, नियम ३१ज, ४९',
      tasks: [
        { id: 'te-2-1', label: 'प्राविधिक र आर्थिक प्रस्ताव अलग-अलग खाममा पेस गर्ने निर्देशनसहित SBD तयार गर्ने', clauseRef: 'नियम ३१ज', isMandatory: true },
        { id: 'te-2-2', label: 'लागत अनुमानको २ देखि ३ प्रतिशत बिड सेक्युरिटी तोक्ने', clauseRef: 'ऐन दफा २१', isMandatory: true },
        { id: 'te-2-3', label: 'राष्ट्रिय दैनिक र e-GP पोर्टलमा कम्तीमा २१ दिनको सूचना प्रकाशित गर्ने', clauseRef: 'नियम ४९', isMandatory: true },
      ],
      requiredDocs: [
        'स्वीकृत दुई खाम बोलपत्र कागजात (SBD)',
        'बोलपत्र आह्वान टिप्पणी तथा प्रकाशित सूचना',
      ],
      redFlags: [
        'प्राविधिक खाममा आर्थिक प्रस्ताव वा दररेट राखिएमा बोलपत्र स्वतः रद्द हुने व्यहोरा सूचनामै स्पष्ट खुलाउनुपर्छ।',
      ],
      templateId: 'tmpl-ifb-ncb',
      templateLabel: 'बोलपत्र आह्वानको सूचनाको ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'प्राविधिक प्रस्ताव खोल्ने र मुचुल्का (आर्थिक प्रस्ताव सुरक्षित राख्ने)',
      titleEnglish: 'Technical Bid Opening & Safe Custody of Financial Bids',
      targetTimeline: 'दाखिला बन्द भएको दिन १:०० बजे',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ३१ज(५), ५९',
      tasks: [
        { id: 'te-3-1', label: 'तोकिएको समयमा बाहिरी खाम खोली प्राविधिक खाम मात्र खोल्ने', clauseRef: 'नियम ३१ज(५)', isMandatory: true },
        { id: 'te-3-2', label: 'आर्थिक प्रस्ताव नखोली सिलबन्दी अवस्थामा सुरक्षित राख्ने', clauseRef: 'नियम ३१ज(५)', isMandatory: true },
        { id: 'te-3-3', label: 'प्राविधिक प्रस्ताव खोल्ने सार्वजनिक मुचुल्का तयार गरी हस्ताक्षर गर्ने', clauseRef: 'नियम ५९', isMandatory: true },
      ],
      requiredDocs: [
        'प्राविधिक प्रस्ताव खोल्ने मुचुल्का',
        'सुरक्षित राखिएका आर्थिक खामहरूको विवरण',
        'बिड सेक्युरिटी प्रतिलिपि',
      ],
      redFlags: [
        'प्राविधिक प्रस्ताव मूल्याङ्कन नसकिँदै कुनै पनि हालतमा आर्थिक प्रस्ताव खोल्न पाइँदैन।',
      ],
      templateId: 'tmpl-bid-opening-minutes',
      templateLabel: 'बोलपत्र खोल्ने सार्वजनिक मुचुल्का ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'प्राविधिक प्रस्ताव मूल्याङ्कन र योग्य फर्महरूको सूची स्वीकृति',
      titleEnglish: 'Technical Evaluation & Qualification Approval',
      targetTimeline: 'खोलेको १५ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ६५ख, ६५ग',
      tasks: [
        { id: 'te-4-1', label: 'योग्यता, विगत कारोबार, विशिष्ट अनुभव, उपकरण र जनशक्ति परीक्षण गर्ने', clauseRef: 'नियम ६५ख', isMandatory: true },
        { id: 'te-4-2', label: '५ वटा चालू ठेक्का सीमा र कालोसूची अवस्था रुजु गर्ने', clauseRef: 'नियम ६५(४घ)', isMandatory: true },
        { id: 'te-4-3', label: 'प्राविधिक रूपमा योग्य (Substantially Responsive) फर्महरूको सूची स्वीकृत गर्ने', clauseRef: 'नियम ६५ग', isMandatory: true },
      ],
      requiredDocs: [
        'प्राविधिक मूल्याङ्कन प्रतिवेदन (Technical Evaluation Report)',
        'योग्यता जाँच रुजु फाराम',
        '५ चालू ठेक्का परीक्षण विवरण',
      ],
      redFlags: [
        'योग्यता नपुगेकालाई पास गराउनु वा योग्यलाई गैरकानूनी कारण देखाई फेल गराउनु दण्डनीय हुन्छ।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'मूल्याङ्कन प्रतिवेदन स्वीकृत गर्ने टिप्पणी ढाँचा',
    },
    {
      stepNo: 5,
      titleNepali: 'आर्थिक प्रस्ताव खोल्ने ७ दिने सूचना र सार्वजनिक खोल्ने मुचुल्का',
      titleEnglish: '7-Day Financial Opening Notice & Public Opening',
      targetTimeline: 'प्राविधिक स्वीकृति पश्चात् ७ दिनको सूचना दिई',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ६५घ, ६५ङ',
      tasks: [
        { id: 'te-5-1', label: 'प्राविधिक रूपमा उत्तीर्ण बोलपत्रदातालाई कम्तीमा ७ दिनको सूचना दिई आर्थिक खोल्ने मिति तोक्ने', clauseRef: 'नियम ६५घ', isMandatory: true },
        { id: 'te-5-2', label: 'सफल बोलपत्रदाताका प्रतिनिधिको रोहबरमा आर्थिक प्रस्ताव खोली कबोल अङ्क पढेर सुनाउने', clauseRef: 'नियम ६५ङ', isMandatory: true },
        { id: 'te-5-3', label: 'आर्थिक प्रस्ताव खोल्ने मुचुल्का र कबोल अङ्क तुलनात्मक तालिका तयार गर्ने', clauseRef: 'नियम ६५ङ', isMandatory: true },
      ],
      requiredDocs: [
        'आर्थिक प्रस्ताव खोल्ने ७ दिने आधिकारिक सूचना',
        'आर्थिक प्रस्ताव खोल्ने मुचुल्का',
        'कबोल अङ्क तुलनात्मक तालिका',
      ],
      redFlags: [
        'असफल भएका बोलपत्रदाताहरूको आर्थिक प्रस्ताव खोल्न पाइँदैन (विद्युतीय बाहेक फिर्ता गर्नुपर्ने)।',
      ],
      templateId: 'tmpl-notesheet-opening-minutes',
      templateLabel: 'आर्थिक प्रस्ताव खोल्ने मुचुल्का तथा प्रारम्भिक टिप्पणी',
    },
    {
      stepNo: 6,
      titleNepali: 'आर्थिक मूल्याङ्कन, ३०% घटी कबोल जाँच र आशयको सूचना (LOI)',
      titleEnglish: 'Financial Evaluation, 30% Cutoff & LOI',
      targetTimeline: 'आर्थिक खोलेको ७-१५ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २५, २७, नियम ६५च, ६६',
      tasks: [
        { id: 'te-6-1', label: 'स्वीकृत लागत भन्दा ३०% भन्दा बढी घटेर कबोल गर्ने बोलपत्र स्वतः हटाउने', clauseRef: 'ऐन दफा २५(७ख), नियम ६५च', isMandatory: true },
        { id: 'te-6-2', label: 'औसत अङ्कसँग सबैभन्दा नजिक भएको बोलपत्र छनोट गर्ने', clauseRef: 'ऐन दफा २५(५क), नियम ६५च', isMandatory: true },
        { id: 'te-6-3', label: '१५% भन्दा बढी घटेको भए थप कार्यसम्पादन जमानत यकिन गर्ने', clauseRef: 'नियम ६५च', isMandatory: true },
        { id: 'te-6-4', label: 'सफल बोलपत्रदाताको नाममा ७ (सात) दिने आशयको सूचना (LOI) प्रकाशित गर्ने', clauseRef: 'ऐन दफा २७(२), नियम ६६', isMandatory: true },
      ],
      requiredDocs: [
        'पूर्ण संयुक्त मूल्याङ्कन प्रतिवेदन',
        'अतिरिक्त जमानत हिसाब तालिका',
        '७ दिने LOI सूचना',
      ],
      redFlags: [
        '७ दिने LOI अवधिमा पुनरावलोकन उजुरी परेमा प्रक्रिया टुङ्गो नलागी सम्झौता गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-loi',
      templateLabel: 'आशयको सूचनाको ढाँचा (LOI)',
    },
    {
      stepNo: 7,
      titleNepali: 'सम्झौता आह्वान (LOA), जमानत दाखिला र खरिद सम्झौता',
      titleEnglish: 'LOA, Performance Security & Contract Execution',
      targetTimeline: 'LOI सकिएको लगत्तै १५ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २७(३), ५२, नियम ६८, अनुसूची ८',
      tasks: [
        { id: 'te-7-1', label: '१५ दिने सम्झौता आह्वान पत्र (LOA) जारी गर्ने', clauseRef: 'नियम ६८', isMandatory: true },
        { id: 'te-7-2', label: '५% कार्यसम्पादन जमानत (+ अतिरिक्त जमानत) बुझ्ने', clauseRef: 'ऐन दफा २७(४)', isMandatory: true },
        { id: 'te-7-3', label: 'SSF आबद्धता रुजु गरी आधिकारिक खरिद सम्झौता सम्पन्न गर्ने', clauseRef: 'ऐन दफा ५२, ५२ख', isMandatory: true },
        { id: 'te-7-4', label: 'कार्यस्थलमा अनुसूची-८ को सूचना पाटी अनिवार्य स्थापना गर्न लगाउने', clauseRef: 'नियम १११, अनुसूची ८', isMandatory: true },
      ],
      requiredDocs: [
        'LOA पत्र',
        'कार्यसम्पादन बैंक जमानत',
        'हस्ताक्षरित खरिद सम्झौता पत्र',
        'अनुसूची-८ सूचना पाटीको तस्बिर',
      ],
      redFlags: [
        'तोकिएको १५ दिनभित्र सम्झौता गर्न नआए जमानत जफत गरी दोस्रो फर्मलाई बोलाउनुपर्छ।',
      ],
      templateId: 'tmpl-contract-agreement',
      templateLabel: 'सार्वजनिक खरिद सम्झौताको ढाँचा',
    },
  ],

  // 4. Sealed Quotation (सिलबन्दी दरभाउपत्र)
  'sealed-quotation': [
    {
      stepNo: 1,
      titleNepali: 'स्पेसिफिकेसन, परिमाण र लागत अनुमान स्वीकृति (रु २० लाख भित्र)',
      titleEnglish: 'Specification, BOQ & Estimate Approval (Up to 20 Lakhs)',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४०, नियमावली नियम ८४',
      tasks: [
        { id: 'sq-1-1', label: 'लागत अनुमान रु २० लाख भित्र (स्वास्थ्य उपकरण/औषधिमा ५० लाख सम्म) रहेको यकिन गर्ने', clauseRef: 'ऐन दफा ४०(१)', isMandatory: true },
        { id: 'sq-1-2', label: 'स्पष्ट स्पेसिफिकेसन वा दर परिमाण सूची (BOQ) तयार गर्ने', clauseRef: 'ऐन दफा ४०(२)', isMandatory: true },
        { id: 'sq-1-3', label: 'कार्यालय प्रमुखबाट आधिकारिक लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम १४', isMandatory: true },
      ],
      requiredDocs: [
        'स्वीकृत लागत अनुमान तथा दर विश्लेषण',
        'स्पेसिफिकेसन तथा BOQ',
        'लागत अनुमान स्वीकृत टिप्पणी तथा आदेश',
      ],
      redFlags: [
        '२० लाख भन्दा माथिको कामलाई टुक्रा पारेर सिलबन्दी दरभाउपत्रमा ल्याउन सख्त मनाही छ।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'सिलबन्दी दरभाउपत्र आह्वान सूचना (कम्तीमा ७ दिनको म्याद)',
      titleEnglish: 'Sealed Quotation Invitation Notice (Min 7 Days)',
      targetTimeline: 'कम्तीमा ७ दिनको म्याद',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४०(३), नियमावली नियम ८४(३)',
      tasks: [
        { id: 'sq-2-1', label: 'राष्ट्रिय वा स्थानीय समाचारपत्र वा e-GP मा कम्तीमा ७ दिनको म्याद दिई सूचना प्रकाशन गर्ने', clauseRef: 'नियम ८४(३)', isMandatory: true },
        { id: 'sq-2-2', label: 'दरभाउपत्र फाराम दस्तुर रु १,००० (e-GP भए निःशुल्क) तोक्ने', clauseRef: 'नियम ८४', isMandatory: true },
        { id: 'sq-2-3', label: 'लागतको २% देखि ३% दरभाउ जमानत (मान्य अवधि ७५ दिन) निर्धारण गर्ने', clauseRef: 'नियम ८४', isMandatory: true },
      ],
      requiredDocs: [
        'सिलबन्दी दरभाउपत्र आह्वान सूचना',
        'अनुसूची दरभाउपत्र फाराम',
        'पत्रिकाको कटिङ वा e-GP सूचना',
      ],
      redFlags: [
        'म्याद ७ दिनभन्दा कम राख्न पाइँदैन; एकपटक पेस भएको दरभाउपत्र फिर्ता वा संशोधन गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-sq-notice',
      templateLabel: 'सिलबन्दी दरभाउपत्र आह्वानको सूचना',
    },
    {
      stepNo: 3,
      titleNepali: 'दरभाउपत्र दाखिला, सार्वजनिक खोल्ने प्रक्रिया र ३ वटाको रुजु',
      titleEnglish: 'Submission, Public Opening & 3-Bid Verification',
      targetTimeline: 'दाखिला बन्द भएको दिन २:०० बजे',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८४(८), नियम ८४(३क)',
      tasks: [
        { id: 'sq-3-1', label: 'तोकिएको दिन र समयमा सार्वजनिक रूपमा दरभाउपत्र खोल्ने', clauseRef: 'नियम ८४(८)', isMandatory: true },
        { id: 'sq-3-2', label: 'कबोल अङ्क र जमानत पढेर सुनाई मुचुल्का तयार गर्ने', clauseRef: 'नियम ८४(८)', isMandatory: true },
        { id: 'sq-3-3', label: 'पहिलो पटकमा कम्तीमा ३ वटा दरभाउपत्र परेको छ कि छैन रुजु गर्ने', clauseRef: 'नियम ८४(३क)', isMandatory: true },
      ],
      requiredDocs: [
        'दरभाउपत्र खोल्ने मुचुल्का (Opening Minutes)',
        'दरभाउपत्रदाताहरूको उपस्थिति पुस्तिका',
        'जमानत भौचर/ग्यारेन्टी',
      ],
      redFlags: [
        'पहिलो पटकको सूचनामा ३ वटा भन्दा कम दरभाउपत्र परेमा अनिवार्य दोस्रो पटक पुनः ७ दिनको सूचना निकाल्नै पर्छ (नियम ८४(३क))।',
      ],
      templateId: 'tmpl-bid-opening-minutes',
      templateLabel: 'दरभाउपत्र खोल्ने सार्वजनिक मुचुल्का ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'मूल्याङ्कन, न्यूनतम मूल्याङ्कित छनोट र स्वीकृतिको टिप्पणी',
      titleEnglish: 'Evaluation & Approval by Office Chief',
      targetTimeline: 'खोलेको १५ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८४(९), नियम ८४(१०)',
      tasks: [
        { id: 'sq-4-1', label: 'मूल्याङ्कन समितिले सारभूत रूपमा प्रभावग्राही दरभाउपत्र परीक्षण गर्ने', clauseRef: 'नियम ८४(९)', isMandatory: true },
        { id: 'sq-4-2', label: 'रितपूर्वक परेका मध्ये न्यूनतम मूल्याङ्कित दरभाउ छनोट गर्ने', clauseRef: 'नियम ८४(९)', isMandatory: true },
        { id: 'sq-4-3', label: 'खोलेको १५ दिनभित्र कार्यालय प्रमुखबाट स्वीकृति गराउने', clauseRef: 'नियम ८४(१०)', isMandatory: true },
      ],
      requiredDocs: [
        'मूल्याङ्कन प्रतिवेदन (Evaluation Report)',
        'तुलनात्मक तालिका (Comparative Chart)',
        'दरभाउपत्र स्वीकृत गर्ने टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'खोलेको १५ दिनभित्र स्वीकृति नगरे दरभाउपत्रको वैधता समाप्त हुने जोखिम हुन्छ।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'मूल्याङ्कन प्रतिवेदन तथा स्वीकृति टिप्पणी ढाँचा',
    },
    {
      stepNo: 5,
      titleNepali: 'सम्झौता आह्वान (७ दिनको म्याद), ५% जमानत र खरिद आदेश/सम्झौता',
      titleEnglish: '7-Day LOA, Performance Security & Agreement',
      targetTimeline: 'स्वीकृति भएको ७ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८४(११), (१२)',
      tasks: [
        { id: 'sq-5-1', label: 'सफल दरभाउपत्रदातालाई ७ दिनको म्याद दिई सम्झौता गर्न बोलाउने', clauseRef: 'नियम ८४(११)', isMandatory: true },
        { id: 'sq-5-2', label: 'कबोल अङ्कको ५% कार्यसम्पादन जमानत बुझ्ने', clauseRef: 'नियम ८४(१२)', isMandatory: true },
        { id: 'sq-5-3', label: 'खरिद सम्झौता वा खरिद आदेश जारी गर्ने', clauseRef: 'नियम ८४(१२)', isMandatory: true },
        { id: 'sq-5-4', label: 'काम/आपूर्ति पश्चात् प्राविधिक जाँचपास गरी भुक्तानी दिने', clauseRef: 'नियम ११५, १२५', isMandatory: true },
      ],
      requiredDocs: [
        'सम्झौता आह्वान पत्र',
        '५% कार्यसम्पादन जमानत',
        'खरिद सम्झौता वा खरिद आदेश',
        'जाँचपास तथा दाखिला प्रतिवेदन',
      ],
      redFlags: [
        '७ दिनभित्र सम्झौता गर्न नआए जमानत जफत गरी दोस्रो फर्मलाई बोलाउनुपर्छ।',
      ],
      templateId: 'tmpl-loa',
      templateLabel: 'सम्झौता आह्वान पत्र ढाँचा',
    },
  ],

  // 5. Direct Purchase (सोझै खरिद)
  'direct-procurement': [
    {
      stepNo: 1,
      titleNepali: 'खरिद आवश्यकता, मौज्दात नभएको यकिन र लागत अनुमान स्वीकृति',
      titleEnglish: 'Purchase Requisition, Stock Verification & Estimate Approval',
      targetTimeline: 'खरिद प्रक्रिया प्रारम्भ गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१, नियमावली नियम ५, ८५, ८६',
      tasks: [
        { id: 'dp-1-1', label: 'स्टोर माग फाराम प्रमाणीकरण गरी जिन्सी मौज्दात नरहेको यकिन गर्ने', clauseRef: 'नियम ५', isMandatory: true },
        { id: 'dp-1-2', label: 'निर्माण/मालसामान रु १५ लाख वा परामर्श/मर्मत रु ५ लाख सीमा भित्र लागत अनुमान तयार गर्ने', clauseRef: 'ऐन दफा ४१', isMandatory: true },
        { id: 'dp-1-3', label: 'सोझै खरिद गर्नुपर्ने कारण र औचित्य खुलाई कार्यालय प्रमुखबाट लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम १४, ८६(१क)', isMandatory: true },
      ],
      requiredDocs: [
        'खरिद माग फाराम (Requisition Form)',
        'जिन्सी मौज्दात नभएको प्रमाणीकरण',
        'स्वीकृत लागत अनुमान',
        'सोझै खरिदको औचित्य टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'प्रतिस्पर्धा छल्न खरिदलाई टुक्रा-टुक्रा पारेर सोझै खरिद गर्न सख्त कानून विपरीत छ।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'मौजुदा सूची (Standing List) बाट कम्तीमा ३ वटा लिखित दरभाउ माग',
      titleEnglish: 'Request for Quotations from Min 3 Listed Firms',
      targetTimeline: '२ देखि ५ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१, नियमावली नियम १८, ८५(४)',
      tasks: [
        { id: 'dp-2-1', label: 'नियम १८ बमोजिमको अद्यावधिक मौजुदा सूची (Standing List) मा दर्ता भएका फर्म रुजु गर्ने', clauseRef: 'नियम १८', isMandatory: true },
        { id: 'dp-2-2', label: 'रु १ लाख माथिको खरिद भए कम्तीमा ३ वटा सूचीकृत फर्मबाट लिखित दरभाउ/कोटेशन माग गर्ने', clauseRef: 'नियम ८५(४)', isMandatory: true },
        { id: 'dp-2-3', label: 'रु १ लाख सम्मको मालसामान भए बजार मूल्यमा सिधै बिल/बीजकबाट खरिद गर्ने', clauseRef: 'नियम ८५(१)', isMandatory: false },
      ],
      requiredDocs: [
        'मौजुदा सूची (Standing List) दर्ता प्रमाण',
        'लिखित दरभाउ माग पत्र (RFQ Letters)',
        'प्राप्त ३ वटा लिखित दरभाउपत्र/कोटेशन',
      ],
      redFlags: [
        'मौजुदा सूचीमा दर्ता नभएका वा ३ वटा भन्दा कम दरभाउ माग गरी खरिद गरेमा बेरुजु ठहरिन्छ।',
      ],
      templateId: 'tmpl-direct-purchase-order',
      templateLabel: 'सोझै खरिद माग तथा दरभाउ पत्र ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'दर विश्लेषण, वार्ता र न्यूनतम मूल्याङ्कित छनोट',
      titleEnglish: 'Rate Analysis, Negotiation & Selection',
      targetTimeline: 'दरभाउ प्राप्त भएको ३ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८६(२), नियम ८६(३)',
      tasks: [
        { id: 'dp-3-1', label: 'प्राप्त दरभाउहरूको तुलनात्मक विश्लेषण र लागत अनुमानसँग तुलना गर्ने', clauseRef: 'नियम ८६(२)', isMandatory: true },
        { id: 'dp-3-2', label: 'आवश्यक भए वार्ता समिति मार्फत दर घटाउने वार्ता गर्ने', clauseRef: 'नियम ८६(२)', isMandatory: true },
        { id: 'dp-3-3', label: 'न्यूनतम दर पेस गर्ने उपयुक्त फर्मलाई खरिद आदेश दिने टिप्पणी स्वीकृत गराउने', clauseRef: 'नियम ८६(३)', isMandatory: true },
      ],
      requiredDocs: [
        'दर तुलनात्मक तालिका (Comparative Statement)',
        'दर विश्लेषण तथा वार्ता मुचुल्का',
        'खरिद आदेश स्वीकृत टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'एक आर्थिक वर्षमा एउटै फर्मबाट तोकिएको सीमा नाघ्ने गरी पटक-पटक सोझै खरिद गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'दरभाउ मूल्याङ्कन तथा खरिद निर्णय टिप्पणी',
    },
    {
      stepNo: 4,
      titleNepali: 'खरिद आदेश जारी, आपूर्ति/कार्य, जिन्सी निरीक्षण र भुक्तानी',
      titleEnglish: 'Purchase Order, Inspection & Payment',
      targetTimeline: 'आदेशमा तोकिएको अवधिभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८६, ११५, १२३',
      tasks: [
        { id: 'dp-4-1', label: 'स्वीकृत फर्मलाई आधिकारिक लिखित खरिद आदेश (Purchase Order) दिने', clauseRef: 'नियम ८६(३)', isMandatory: true },
        { id: 'dp-4-2', label: 'सामान आपूर्ति भएपछि प्राविधिक निरीक्षण गरी गुणस्तर र परिमाण रुजु गर्ने', clauseRef: 'नियम ११५', isMandatory: true },
        { id: 'dp-4-3', label: 'स्टोर दाखिला प्रतिवेदन (MSR) तयार गर्ने र भ्याट बिल अनुसार भुक्तानी दिने', clauseRef: 'नियम ११५, १२३', isMandatory: true },
      ],
      requiredDocs: [
        'खरिद आदेश पत्र (Purchase Order)',
        'भ्याट बिल तथा डेलिभरी रसिद',
        'जिन्सी दाखिला प्रतिवेदन (MSR)',
        'भुक्तानी आदेश',
      ],
      redFlags: [
        'दाखिला प्रतिवेदन र प्राविधिक जाँचपास विना सिधै भुक्तानी गरेमा महालेखापरीक्षकबाट असुलउपर हुन्छ।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'दाखिला तथा सम्पन्नता प्रमाणपत्र ढाँचा',
    },
  ],

  // 6. User Committee (उपभोक्ता समिति)
  'user-committee': [
    {
      stepNo: 1,
      titleNepali: 'योजना छनोट, जनसहभागिता यकिन र लागत अनुमान (रु १ करोड सम्म)',
      titleEnglish: 'Project Selection, Contribution Ratio & Cost Estimate',
      targetTimeline: 'योजना सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४४, नियमावली नियम ९७',
      tasks: [
        { id: 'uc-1-1', label: 'वार्षिक स्वीकृत कार्यक्रम अनुसार योजना छनोट गर्ने', clauseRef: 'नियम ९७(१)', isMandatory: true },
        { id: 'uc-1-2', label: 'लागत अनुमान रु १ करोड भित्र (VAT, Overhead, Cont. र जनसहभागिता सहित) भएको यकिन गर्ने', clauseRef: 'नियम ९७(१क)', isMandatory: true },
        { id: 'uc-1-3', label: 'जनसहभागिता अंश (श्रम वा नगद) यकिन गरी प्राविधिक लागत अनुमान स्वीकृत गर्ने', clauseRef: 'नियम ९७(१क)', isMandatory: true },
        { id: 'uc-1-4', label: 'हेभी मेसिनरी प्रयोग निषेधको सर्त समावेश गर्ने', clauseRef: 'नियम ९७(२)', isMandatory: true },
      ],
      requiredDocs: [
        'योजना छनोट निर्णय प्रतिलिपि',
        'विस्तृत इन्जिनियरिङ नक्सा र प्राविधिक लागत अनुमान',
        'जनसहभागिता हिसाब तालिका',
        'लागत अनुमान स्वीकृत टिप्पणी तथा आदेश',
      ],
      redFlags: [
        '१ करोड भन्दा माथिका योजना उपभोक्ता समितिबाट गराउन पाइँदैन।',
        'हेभी मेसिनहरू (लोडर, एक्साभेटर, रोलर, डोजर आदि) प्रयोग गर्न सख्त निषेध छ।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'खुला उपभोक्ता भेला, समिति गठन र दर्ता',
      titleEnglish: 'Public Mass Gathering, Committee Formation & Registration',
      targetTimeline: 'कम्तीमा ७ दिनको सूचना दिई भेला',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९७(१), नियम ९७(२)',
      tasks: [
        { id: 'uc-2-1', label: 'प्रत्यक्ष लाभग्राही बासिन्दाहरूको खुला भेला बोलाई अध्यक्ष, सचिव, कोषाध्यक्षसहित समिति गठन गर्ने', clauseRef: 'नियम ९७(१)', isMandatory: true },
        { id: 'uc-2-2', label: 'कामको गुणस्तर निगरानी गर्न छुट्टै उपभोक्ता अनुगमन समिति गठन गर्ने', clauseRef: 'नियम ९७(१)', isMandatory: true },
        { id: 'uc-2-3', label: 'स्थानीय तह वा सम्बन्धित निकायमा उपभोक्ता समिति दर्ता गरी प्रमाणपत्र लिने', clauseRef: 'नियम ९७(१)', isMandatory: true },
        { id: 'uc-2-4', label: 'वाणिज्य बैंकमा समितिको नाममा संयुक्त खाता सञ्चालन गर्ने', clauseRef: 'नियम ९७', isMandatory: true },
      ],
      requiredDocs: [
        'आम भेलाको निर्णय र उपस्थिति माइन्युट',
        'उपभोक्ता समिति तथा अनुगमन समिति गठन फाराम',
        'उपभोक्ता समिति दर्ता प्रमाणपत्र र विधान',
        'बैंक खाता सञ्चालन सिफारिस पत्र',
      ],
      redFlags: [
        'राजनीतिक वा सीमित व्यक्तिको कोठे भेलाबाट समिति गठन गर्न पाइँदैन। सार्वजनिक लाभको पदमा रहेका व्यक्ति पदाधिकारी हुन पाउँदैनन्।',
      ],
      templateId: 'tmpl-user-committee-agreement',
      templateLabel: 'उपभोक्ता समिति गठन तथा सम्झौता ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'खरिद सम्झौता, कार्यतालिका र कार्यस्थल सूचना पाटी (अनुसूची ८)',
      titleEnglish: 'Agreement, Schedule & Site Board Installation',
      targetTimeline: 'दर्ता भएको ७ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९७(३), नियम १११, अनुसूची ८',
      tasks: [
        { id: 'uc-3-1', label: 'कामको परिमाण, जनसहभागिता अंश र भुक्तानी सर्त खुलाई खरिद सम्झौता गर्ने', clauseRef: 'नियम ९७(३)', isMandatory: true },
        { id: 'uc-3-2', label: 'कार्य सम्पादन समयतालिका (Work Schedule) स्वीकृत गर्ने', clauseRef: 'नियम ९७(३)', isMandatory: true },
        { id: 'uc-3-3', label: 'कार्यस्थलमा नियम १११(१)(ज१) बमोजिम अनुसूची-८ को नागरिक सूचना पाटी अनिवार्य स्थापना गर्ने', clauseRef: 'अनुसूची ८', isMandatory: true },
      ],
      requiredDocs: [
        'खरिद सम्झौता पत्र (Agreement Document)',
        'स्वीकृत कार्यतालिका (Work Schedule)',
        'अनुसूची-८ कार्यस्थल सूचना पाटीको तस्बिर',
      ],
      redFlags: [
        'उपभोक्ता समितिले काम कुनै निर्माण व्यवसायी वा बिचौलियालाई दिन पाइँदैन। त्यसो गरेको पाइएमा सम्झौता रद्द हुन्छ (नियम ९७(१३क))।',
      ],
      templateId: 'tmpl-site-board',
      templateLabel: 'निर्माण कार्यस्थल सूचना पाटीको ढाँचा (अनुसूची-८)',
    },
    {
      stepNo: 4,
      titleNepali: 'मोबिलाइजेसन पेश्की (१/३ सम्म) र प्राविधिक सुपरीवेक्षण',
      titleEnglish: 'Mobilization Advance (Up to 1/3) & Supervision',
      targetTimeline: 'सम्झौता पश्चात् काम सुरु गर्दा',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९७(३ख), नियम ९७(५)',
      tasks: [
        { id: 'uc-4-1', label: 'सम्झौता रकमको बढीमा ३३.३३% (एक तिहाइ) सम्म अग्रिम पेश्की निकासा दिने', clauseRef: 'नियम ९७(५)', isMandatory: true },
        { id: 'uc-4-2', label: 'स्थानीय श्रम र सामग्री परिचालन गरी काम सुरु गर्ने', clauseRef: 'नियम ९७(३ख)', isMandatory: true },
        { id: 'uc-4-3', label: 'कार्यालयको प्राविधिक कर्मचारीबाट नियमित गुणस्तर जाँच र नाप किताब (MB) दर्ता गर्ने', clauseRef: 'नियम ९७(३ख)', isMandatory: true },
      ],
      requiredDocs: [
        'पेश्की माग निवेदन र निकासा टिप्पणी',
        'नाप किताब (Measurement Book - MB)',
        'सामग्री खरिद बिल भरपाई तथा मस्टर रोल',
      ],
      redFlags: [
        'पेश्की रकम व्यक्तिगत खातामा राख्न पाइँदैन; कार्य प्रगति अनुसार मात्र पछिल्लो किस्ता निकासा गर्नुपर्छ।',
      ],
      templateId: 'tmpl-contract-agreement',
      templateLabel: 'सम्झौता तथा कार्य सञ्चालन ढाँचा',
    },
    {
      stepNo: 5,
      titleNepali: 'सार्वजनिक सुनुवाइ, सामाजिक लेखापरीक्षण र रनिङ बिल भुक्तानी',
      titleEnglish: 'Public Hearing, Social Audit & Running Bill Payment',
      targetTimeline: 'प्रत्येक किस्ता भुक्तानी पूर्व',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९७(७)',
      tasks: [
        { id: 'uc-5-1', label: 'खर्चको विवरण सार्वजनिक सूचना पाटीमा टाँस गर्ने', clauseRef: 'नियम ९७(७)', isMandatory: true },
        { id: 'uc-5-2', label: 'लाभग्राही समुदायको रोहबरमा सार्वजनिक सुनुवाइ र सामाजिक लेखापरीक्षण (Social Audit) सम्पन्न गर्ने', clauseRef: 'नियम ९७(७)', isMandatory: true },
        { id: 'uc-5-3', label: 'अनुगमन समितिको सिफारिस र प्राविधिक नापजाँचका आधारमा रनिङ बिल भुक्तानी दिने', clauseRef: 'नियम ९७(७)', isMandatory: true },
      ],
      requiredDocs: [
        'सार्वजनिक सुनुवाइ माइन्युट र उपस्थिति',
        'सामाजिक लेखापरीक्षण (Social Audit) प्रतिवेदन',
        'खर्च विवरण टाँस गरिएको तस्बिर',
        'अनुगमन समितिको सिफारिस पत्र',
      ],
      redFlags: [
        'सामाजिक लेखापरीक्षण र सार्वजनिक सुनुवाइ नगरी भुक्तानी दिएमा अख्तियार र महालेखाको प्रत्यक्ष कारबाही हुन्छ।',
      ],
      templateId: 'tmpl-user-committee-agreement',
      templateLabel: 'सामाजिक लेखापरीक्षण तथा सुनुवाइ ढाँचा',
    },
    {
      stepNo: 6,
      titleNepali: 'अन्तिम नापजाँच, कार्य सम्पन्न प्रतिवेदन र योजना हस्तान्तरण',
      titleEnglish: 'Final Measurement, Completion Report & Handover',
      targetTimeline: 'काम सम्पन्न भएको १५ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९७(११), नियम ९७(१२)',
      tasks: [
        { id: 'uc-6-1', label: 'इन्जिनियरबाट अन्तिम नापजाँच (Final MB) गरी जाँचपास प्रतिवेदन तयार गर्ने', clauseRef: 'नियम ९७(११)', isMandatory: true },
        { id: 'uc-6-2', label: 'जनसहभागिता र पेश्की मिलान गरी अन्तिम खर्च फछ्र्यौट गर्ने', clauseRef: 'नियम ९७(११)', isMandatory: true },
        { id: 'uc-6-3', label: 'कार्य सम्पन्न प्रमाणपत्र जारी गरी योजनाको मर्मत सम्भार र सञ्चालन उपभोक्ता समितिलाई हस्तान्तरण गर्ने', clauseRef: 'नियम ९७(१२)', isMandatory: true },
      ],
      requiredDocs: [
        'अन्तिम नाप किताब (Final MB)',
        'कार्य सम्पन्न प्रतिवेदन तथा प्रमाणपत्र',
        'आयोजना हस्तान्तरण फाराम (Handover Certificate)',
        'अन्तिम लेखापरीक्षण तथा खर्च फछ्र्यौट फाराम',
      ],
      redFlags: [
        'निर्माण सम्पन्न भएपछि हस्तान्तरण नभई बेवारिसे छाड्न पाइँदैन। मर्मत कोष खडा गर्नुपर्छ।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'कार्य सम्पन्न प्रमाणपत्र ढाँचा',
    },
  ],

  // 7. Consulting QCBS (परामर्श सेवा - गुणस्तर र लागत विधि)
  'consulting-qcbs': [
    {
      stepNo: 1,
      titleNepali: 'कार्यक्षेत्रगत सर्त (TOR) र जनशक्ति लागत अनुमान स्वीकृति',
      titleEnglish: 'Terms of Reference (TOR) & Cost Estimate Approval',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा २९, नियमावली नियम १२, १४, ६९',
      tasks: [
        { id: 'c-1-1', label: 'कार्यालयको आन्तरिक जनशक्तिबाट काम हुन नसक्ने औचित्य पुष्टि गर्ने', clauseRef: 'ऐन दफा २९', isMandatory: true },
        { id: 'c-1-2', label: 'उद्देश्य, कार्यक्षेत्र, जनशक्ति (विज्ञ), डेलिभरेबल्स र समयतालिकासहितको TOR तयार गर्ने', clauseRef: 'नियम ६९', isMandatory: true },
        { id: 'c-1-3', label: 'अनुसूची १क बमोजिम पारिश्रमिक र सोधभर्ना खर्च यकिन गरी लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम १२, १४', isMandatory: true },
      ],
      requiredDocs: [
        'कार्यक्षेत्रगत सर्त (Terms of Reference - TOR)',
        'अनुसूची १क बमोजिमको लागत अनुमान',
        'आन्तरिक जनशक्ति अभाव पुष्टि टिप्पणी',
      ],
      redFlags: [
        'कर्मचारीले गर्न सक्ने नियमित काममा बाह्य परामर्शदाता नियुक्त गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'आशयपत्र (EOI) आह्वान र ३ देखि ६ फर्मको संक्षिप्त सूची (Shortlisting)',
      titleEnglish: 'EOI Notice & Shortlisting of 3-6 Firms',
      targetTimeline: 'कम्तीमा १५ दिनको सूचना',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ३०, नियमावली नियम ७०',
      tasks: [
        { id: 'c-2-1', label: 'कम्तीमा १५ दिनको म्याद दिई राष्ट्रिय दैनिक पत्रिकामा EOI सूचना प्रकाशन गर्ने', clauseRef: 'ऐन दफा ३०, नियम ७०', isMandatory: true },
        { id: 'c-2-2', label: 'प्राप्त आशयपत्रहरूको योग्यता, विगत अनुभव र क्षमता मूल्याङ्कन गर्ने', clauseRef: 'ऐन दफा ३०(४)', isMandatory: true },
        { id: 'c-2-3', label: '३ देखि ६ वटा उत्कृष्ट परामर्शदाताहरूको संक्षिप्त सूची (Shortlist) स्वीकृत गर्ने', clauseRef: 'ऐन दफा ३०(५)', isMandatory: true },
      ],
      requiredDocs: [
        'EOI आह्वान सूचना',
        'प्राप्त EOI आवेदनहरू',
        'संक्षिप्त सूचीकरण मूल्याङ्कन प्रतिवेदन (Shortlisting Report)',
        'संक्षिप्त सूची स्वीकृति निर्णय',
      ],
      redFlags: [
        '३ वटा भन्दा कम योग्य भएमा पुनः EOI निकाल्नुपर्छ; ६ वटा भन्दा बढीलाई सूचीकृत गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-eoi-notice',
      templateLabel: 'परामर्श सेवा EOI आह्वान तथा संक्षिप्त सूची ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'प्रस्ताव माग पत्र (RFP) जारी (कम्तीमा ३० दिनको म्याद)',
      titleEnglish: 'Request for Proposal (RFP) Issuance (Min 30 Days)',
      targetTimeline: 'कम्तीमा ३० दिनको म्याद',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ३१, नियमावली नियम ७१',
      tasks: [
        { id: 'c-3-1', label: 'संक्षिप्त सूचीका फर्महरूलाई मात्र मानक प्रस्ताव माग पत्र (RFP) जारी गर्ने', clauseRef: 'नियम ७१', isMandatory: true },
        { id: 'c-3-2', label: 'प्राविधिक प्रस्ताव र आर्थिक प्रस्ताव अलग-अलग सिलबन्दी खाममा माग गर्ने', clauseRef: 'ऐन दफा ३१', isMandatory: true },
        { id: 'c-3-3', label: 'RFP मा प्राविधिक (८०%) र आर्थिक (२०%) मूल्याङ्कन आधार स्पष्ट खुलाउने', clauseRef: 'नियम ७१', isMandatory: true },
      ],
      requiredDocs: [
        'स्वीकृत मानक RFP कागजात',
        'सूचीकृत फर्महरूलाई पठाइएको पत्र',
        'प्रस्ताव दर्ता किताब',
      ],
      redFlags: [
        'RFP मा स्पष्ट मूल्याङ्कन आधार उल्लेख हुनैपर्छ; अस्पष्ट सर्त राख्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-ifb',
      templateLabel: 'RFP जारी सम्बन्धी टिप्पणी ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'प्राविधिक प्रस्ताव खोल्ने र मूल्याङ्कन (आर्थिक सुरक्षित राख्ने)',
      titleEnglish: 'Technical Proposal Opening & Evaluation',
      targetTimeline: 'दाखिला भएको दिन खोल्ने, १५ दिनमा मूल्याङ्कन',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ३३, नियमावली नियम ७६',
      tasks: [
        { id: 'c-4-1', label: 'तोकिएको मितिमा प्राविधिक प्रस्ताव मात्र खोल्ने र आर्थिक खाम सुरक्षित राख्ने', clauseRef: 'ऐन दफा ३३', isMandatory: true },
        { id: 'c-4-2', label: 'फर्मको अनुभव, कार्यविधि, विशेषज्ञ जनशक्तिको CV मूल्याङ्कन गर्ने', clauseRef: 'नियम ७६', isMandatory: true },
        { id: 'c-4-3', label: 'उत्तीर्णाङ्क (सामान्यतया ७० वा ७५) ल्याउने प्राविधिक रूपमा सफल फर्महरूको सूची स्वीकृत गर्ने', clauseRef: 'नियम ७६', isMandatory: true },
      ],
      requiredDocs: [
        'प्राविधिक प्रस्ताव खोल्ने मुचुल्का',
        'प्राविधिक मूल्याङ्कन प्रतिवेदन (Technical Evaluation Report)',
        'उत्तीर्ण फर्महरूको सूची र टिप्पणी',
      ],
      redFlags: [
        'प्राविधिक मूल्याङ्कन नसकिँदै कुनै हालतमा आर्थिक खाम खोल्न वा आर्थिक दररेट हेर्न पाइँदैन।',
      ],
      templateId: 'tmpl-bid-opening-minutes',
      templateLabel: 'प्रस्ताव खोल्ने सार्वजनिक मुचुल्का ढाँचा',
    },
    {
      stepNo: 5,
      titleNepali: 'आर्थिक प्रस्ताव खोल्ने, QCBS संयुक्त अङ्क र वार्ता (Negotiation)',
      titleEnglish: 'Financial Opening, QCBS Combined Score & Negotiation',
      targetTimeline: 'प्राविधिक नतिजा पश्चात् ७ दिनको सूचना दिई',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ३५, ३७, नियमावली नियम ८१',
      tasks: [
        { id: 'c-5-1', label: 'प्राविधिक उत्तीर्ण फर्महरूको आर्थिक प्रस्ताव खोली कबोल रकम पढेर सुनाउने', clauseRef: 'ऐन दफा ३५', isMandatory: true },
        { id: 'c-5-2', label: 'QCBS सुत्र अनुसार संयुक्त अङ्क गणना गरी अधिकतम अङ्क ल्याउने परामर्शदाता छनोट गर्ने', clauseRef: 'नियम ८१', isMandatory: true },
        { id: 'c-5-3', label: 'TOR, कार्यतालिका र सोधभर्ना खर्चमा वार्ता गर्ने (पारिश्रमिक दर घटाउन पाइँदैन)', clauseRef: 'ऐन दफा ३७', isMandatory: true },
      ],
      requiredDocs: [
        'आर्थिक प्रस्ताव खोल्ने मुचुल्का',
        'QCBS संयुक्त मूल्याङ्कन प्रतिवेदन',
        'वार्ताको आधिकारिक माइन्युट (Minutes of Negotiation)',
      ],
      redFlags: [
        'QCBS विधिमा परामर्शदाताको पारिश्रमिक दर घटाउने गरी वार्ता गर्न सख्त कानून विपरीत छ।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'मूल्याङ्कन तथा वार्ता सम्बन्धी टिप्पणी ढाँचा',
    },
    {
      stepNo: 6,
      titleNepali: 'आशयको सूचना (LOI), सम्झौता र व्यावसायिक दायित्व बीमा (PLI)',
      titleEnglish: 'LOI, Contract Agreement & Professional Liability Insurance',
      targetTimeline: 'वार्ता पश्चात् ७ दिनको LOI र १५ दिनमा सम्झौता',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ३८, नियमावली नियम ६८',
      tasks: [
        { id: 'c-6-1', label: 'सफल परामर्शदाताको नाममा ७ (सात) दिने आशयको सूचना (LOI) प्रकाशित गर्ने', clauseRef: 'ऐन दफा ३८(१)', isMandatory: true },
        { id: 'c-6-2', label: '१५ दिनभित्र ५% कार्यसम्पादन जमानत लिई परामर्श सेवा सम्झौता सम्पन्न गर्ने', clauseRef: 'ऐन दफा ३८(४)', isMandatory: true },
        { id: 'c-6-3', label: 'सम्झौता भएको ३० दिनभित्र कुल रकम बराबरको व्यावसायिक दायित्व बीमा (PLI) बुझ्ने', clauseRef: 'ऐन दफा ३८(६)', isMandatory: true },
      ],
      requiredDocs: [
        '७ दिने LOI सूचना',
        'हस्ताक्षरित परामर्श सम्झौता पत्र',
        '५% कार्यसम्पादन जमानत',
        'व्यावसायिक दायित्व बीमा (PLI) पोलिसी',
      ],
      redFlags: [
        'सम्झौता भएको ३० दिनभित्र PLI पेस नगरे सम्झौता रद्द गरी जमानत जफत गर्नुपर्छ (ऐन दफा ३८(६))।',
      ],
      templateId: 'tmpl-loi',
      templateLabel: 'आशयको सूचनाको ढाँचा (LOI)',
    },
    {
      stepNo: 7,
      titleNepali: 'प्रारम्भिक, मध्यावधि र अन्तिम प्रतिवेदन अनुमोदन तथा भुक्तानी',
      titleEnglish: 'Deliverables Approval, Inception/Final DPR & Payments',
      targetTimeline: 'सम्झौताको कार्यतालिका अनुसार',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ११८, १२५',
      tasks: [
        { id: 'c-7-1', label: 'Inception Report, Interim Report प्राविधिक समितिबाट समीक्षा गरी सुझाव दिने', clauseRef: 'नियम ११८', isMandatory: true },
        { id: 'c-7-2', label: 'Draft Final Report र Final DPR प्रतिवेदन विस्तृत अध्ययन गरी स्वीकृत गर्ने', clauseRef: 'नियम १२५', isMandatory: true },
        { id: 'c-7-3', label: 'डेलिभरेबल्स स्वीकृतिका आधारमा चरणबद्ध भुक्तानी फछ्र्यौट गर्ने', clauseRef: 'नियम १२५', isMandatory: true },
      ],
      requiredDocs: [
        'प्रारम्भिक प्रतिवेदन (Inception Report)',
        'मस्यौदा तथा अन्तिम प्रतिवेदन (Draft/Final Report/DPR)',
        'प्राविधिक समिति समीक्षा माइन्युट',
        'कार्य सम्पन्न प्रमाणपत्र र अन्तिम बिल भुक्तानी',
      ],
      redFlags: [
        'तोकिएको डेलिभरेबल र मुख्य विज्ञहरूको Time Sheet रुजु नभई भुक्तानी गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'कार्य सम्पन्न प्रमाणपत्र ढाँचा',
    },
  ],

  // 8. GeM Marketplace (सरकारी ई-मार्केटप्लेस)
  'gem-marketplace': [
    {
      stepNo: 1,
      titleNepali: 'ई-मार्केटप्लेसमा उत्पादन पहिचान, स्पेसिफिकेसन र बजेट स्वीकृति',
      titleEnglish: 'Product Identification on GeM & Budget Approval',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४१क, नियमावली नियम ८६क',
      tasks: [
        { id: 'gem-1-1', label: 'PPMO को GeM पोर्टलमा सूचीकृत वस्तु वा सेवाको स्पेसिफिकेसन र मूल्यसूची खोजी गर्ने', clauseRef: 'ऐन दफा ४१क', isMandatory: true },
        { id: 'gem-1-2', label: 'जिन्सी मौज्दात नभएको यकिन गरी बजेट स्रोत सुनिश्चितता प्राप्त गर्ने', clauseRef: 'नियम ५', isMandatory: true },
        { id: 'gem-1-3', label: 'कार्यालय प्रमुखबाट GeM मार्फत खरिद गर्ने निर्णय र लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम ८६क(१)', isMandatory: true },
      ],
      requiredDocs: [
        'खरिद माग फाराम',
        'GeM पोर्टल उत्पादन विवरण तथा मूल्यसूची',
        'बजेट स्रोत सुनिश्चितता तथा निर्णय टिप्पणी',
      ],
      redFlags: [
        'GeM मा सूचीकृत नभएका वस्तु वा गैर-प्रमाणित फर्मबाट यो विधि प्रयोग गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'सीमा अनुसार GeM प्रक्रिया छनोट (एकल, ३ दरभाउ, वा रिभर्स अक्सन)',
      titleEnglish: 'Selection of GeM Mode (Direct/3-Quotes/Reverse Auction)',
      targetTimeline: '२ देखि ७ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८६क(२)',
      tasks: [
        { id: 'gem-2-1', label: 'रु १० लाख सम्म भए एउटा मात्र उत्पादक/विक्रेतासँग सिधै खरिद छनोट गर्ने', clauseRef: 'नियम ८६क(२)(क)', isMandatory: false },
        { id: 'gem-2-2', label: 'रु २० लाख सम्म भए कम्तीमा ३ वटा विक्रेतासँग अनलाइन दरभाउ माग गरी न्यूनतम छनोट गर्ने', clauseRef: 'नियम ८६क(२)(ख)', isMandatory: false },
        { id: 'gem-2-3', label: 'रु ५० लाख सम्म भए कबोल अङ्क घटाघट (Reverse Auction) विधि सञ्चालन गर्ने', clauseRef: 'नियम ८६क(२)(ग)', isMandatory: false },
      ],
      requiredDocs: [
        'GeM अनलाइन दरभाउ तुलनात्मक तालिका',
        'रिभर्स अक्सन नतिजा प्रतिवेदन',
        'न्यूनतम मूल्याङ्कित छनोट निर्णय',
      ],
      redFlags: [
        '२० लाख माथिको खरिदमा रिभर्स अक्सन नगरी सिधै अर्डर गरेमा नियम विपरीत हुन्छ।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'GeM मूल्याङ्कन तथा छनोट निर्णय टिप्पणी',
    },
    {
      stepNo: 3,
      titleNepali: 'अनलाइन खरिद अर्डर (GeM Purchase Order) जारी',
      titleEnglish: 'Issuance of GeM Purchase Order',
      targetTimeline: 'निर्णय भएको २४ घण्टाभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८६क(३)',
      tasks: [
        { id: 'gem-3-1', label: 'GeM प्रणाली मार्फत न्यूनतम मूल्याङ्कित आपूर्तिकर्तालाई आधिकारिक खरिद अर्डर जारी गर्ने', clauseRef: 'नियम ८६क(३)', isMandatory: true },
        { id: 'gem-3-2', label: 'सामान डेलिभरी अवधि, वारेन्टी र भुक्तानी सर्त अनलाइन पुष्टि गर्ने', clauseRef: 'नियम ८६क', isMandatory: true },
      ],
      requiredDocs: [
        'प्रणालीबाट उत्पादित GeM Purchase Order',
        'आपूर्तिकर्ताको अनलाइन अर्डर स्वीकृति पत्र',
      ],
      redFlags: [
        'GeM प्रणाली बाहिर गएर अनौपचारिक वा नगद सम्झौता गर्न सख्त मनाही छ।',
      ],
      templateId: 'tmpl-direct-purchase-order',
      templateLabel: 'खरिद अर्डर तथा सम्झौता पत्र ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'सामान आपूर्ति, प्राविधिक निरीक्षण, जिन्सी दाखिला र अनलाइन भुक्तानी',
      titleEnglish: 'Delivery, Inspection, Store Entry & Online Payment',
      targetTimeline: 'डेलिभरी भएको ३० दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ८६क, नियम ११५',
      tasks: [
        { id: 'gem-4-1', label: 'तोकिएको समयभित्र सामान प्राप्त गरी प्राविधिक समितिबाट गुणस्तर/स्पेसिफिकेसन जाँच गर्ने', clauseRef: 'नियम ११५', isMandatory: true },
        { id: 'gem-4-2', label: 'स्टोर दाखिला प्रतिवेदन (MSR) तयार गरी GeM पोर्टलमा प्राप्ति कन्फर्म गर्ने', clauseRef: 'नियम ११५', isMandatory: true },
        { id: 'gem-4-3', label: 'भ्याट बिल अनुसार भुक्तानी निकासा दिने', clauseRef: 'नियम ८६क', isMandatory: true },
      ],
      requiredDocs: [
        'जिन्सी निरीक्षण प्रतिवेदन',
        'जिन्सी दाखिला प्रतिवेदन (MSR)',
        'भ्याट बिल तथा अनलाइन भुक्तानी रसिद',
      ],
      redFlags: [
        'जाँचपास विना GeM पोर्टलमा Acceptance कन्फर्म गरेमा सामान बिग्रेको भए कार्यालय जिम्मेवार हुनेछ।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'दाखिला तथा सम्पन्नता प्रमाणपत्र ढाँचा',
    },
  ],

  // 9. Catalog Shopping (क्याटलग सपिङ)
  'catalog-shopping': [
    {
      stepNo: 1,
      titleNepali: 'प्राविधिक आवश्यकता, न्यूनतम क्षमता निर्धारण र लागत अनुमान',
      titleEnglish: 'Technical Needs, Minimum Capacity & Estimate Approval',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ८(१)(८), नियमावली नियम ३१ख(१)',
      tasks: [
        { id: 'cs-1-1', label: 'हेभी इक्विपमेन्ट, सवारी साधन वा स्वास्थ्य औजार (X-Ray/MRI आदि) को आवश्यकता यकिन गर्ने', clauseRef: 'नियम ३१ख(१)', isMandatory: true },
        { id: 'cs-1-2', label: 'उपकरणको न्यूनतम प्राविधिक क्षमता र कार्य आवश्यकता निर्धारण गर्ने', clauseRef: 'नियम ३१ख(१)', isMandatory: true },
        { id: 'cs-1-3', label: 'बजार क्याटलग दरका आधारमा लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम १४', isMandatory: true },
      ],
      requiredDocs: [
        'उपकरणको कार्य आवश्यकता विवरण (Schedule of Requirements)',
        'स्वीकृत लागत अनुमान',
        'क्याटलग सपिङ विधि अपनाउने औचित्य टिप्पणी',
      ],
      redFlags: [
        'साधारण मालसामान वा बहुवर्षीय सम्झौतामा यो विधि प्रयोग गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'उत्पादक वा अधिकृत विक्रेतालाई ७ देखि १५ दिनको लिखित सूचना',
      titleEnglish: 'Notice to Manufacturers/Authorized Dealers (7-15 Days)',
      targetTimeline: 'कम्तीमा ७ दिन देखि १५ दिनको म्याद',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ३१ख(१), नियम ३१ख(२)',
      tasks: [
        { id: 'cs-2-1', label: 'समान स्तरका उत्पादक वा नेपालस्थित आधिकारिक विक्रेताहरूलाई लिखित सूचना पठाउने', clauseRef: 'नियम ३१ख(१)', isMandatory: true },
        { id: 'cs-2-2', label: 'आधिकारिक क्याटलग, ब्रोसर र मूल्य विवरण माग गर्ने (बोलपत्र जमानत नलाग्ने)', clauseRef: 'नियम ३१ख(२)', isMandatory: true },
      ],
      requiredDocs: [
        'विक्रेताहरूलाई पठाइएको सूचना पत्र',
        'सूचना दर्ता भरपाई तथा पत्रिका कटिङ',
      ],
      redFlags: [
        'सार्वजनिक नगरिएको गोप्य दरमा यो विधि लागू हुँदैन। ब्रोसर वा वेबसाइटमा सार्वजनिक दर हुनैपर्छ।',
      ],
      templateId: 'tmpl-notesheet-ifb',
      templateLabel: 'क्याटलग माग सूचना सम्बन्धी टिप्पणी ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'क्याटलग/ब्रोसर दर्ता, समान गुणस्तर परीक्षण र सूची तयारी',
      titleEnglish: 'Catalog Registration, Quality Check & Listing',
      targetTimeline: 'म्याद सकिएको ३ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ३१ख(३)',
      tasks: [
        { id: 'cs-3-1', label: 'दर्ता भएका क्याटलग/ब्रोसरको प्राविधिक अध्ययन गर्ने', clauseRef: 'नियम ३१ख(३)', isMandatory: true },
        { id: 'cs-3-2', label: 'तोकिएको न्यूनतम क्षमता र गुणस्तर पूरा गर्ने उत्पादनहरूको सूची स्वीकृत गर्ने', clauseRef: 'नियम ३१ख(३)', isMandatory: true },
      ],
      requiredDocs: [
        'दर्ता भएका क्याटलगहरूको रुजु फाराम',
        'प्राविधिक क्षमता परीक्षण प्रतिवेदन',
        'स्वीकृत समान गुणस्तर उत्पादन सूची',
      ],
      redFlags: [
        'न्यूनतम क्षमता नपुगेका उत्पादनलाई सूचीमा समावेश गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'क्याटलग परीक्षण तथा सूचीकरण टिप्पणी',
    },
    {
      stepNo: 4,
      titleNepali: 'मूल्यमा छुट र सुविधासहित आर्थिक प्रस्ताव माग र छनोट',
      titleEnglish: 'Discount & Facility Quotation & Selection',
      targetTimeline: '३ देखि ७ दिनको म्याद',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ३१ख(४), नियम ३१ख(५)',
      tasks: [
        { id: 'cs-4-1', label: 'सूचीकृत कम्पनीहरूबाट सार्वजनिक दरमा दिइने अधिकतम छुट (Discount) र अतिरिक्त सुविधा माग गर्ने', clauseRef: 'नियम ३१ख(४)', isMandatory: true },
        { id: 'cs-4-2', label: 'अधिकतम छुट र सुविधा दिने न्यूनतम मूल्याङ्कित प्रस्ताव छनोट गर्ने', clauseRef: 'नियम ३१ख(५)', isMandatory: true },
      ],
      requiredDocs: [
        'छुट प्रस्ताव माग पत्र',
        'प्राप्त सिलबन्दी छुट प्रस्तावहरू',
        'छुट तुलनात्मक तालिका र मूल्याङ्कन निर्णय',
      ],
      redFlags: [
        'सार्वजनिक क्याटलग दर भन्दा बढी रकम कबोल भएको प्रस्ताव स्वीकार गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'छुट मूल्याङ्कन तथा छनोट निर्णय टिप्पणी',
    },
    {
      stepNo: 5,
      titleNepali: '५% कार्यसम्पादन जमानत, सम्झौता, डेलिभरी र जिन्सी दाखिला',
      titleEnglish: 'Performance Security, Agreement, Commissioning & Store Entry',
      targetTimeline: 'सम्झौता अनुसारको डेलिभरी अवधि',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ३१ख(६), नियम ११५',
      tasks: [
        { id: 'cs-5-1', label: '५% कार्यसम्पादन जमानत लिई खरिद सम्झौता गर्ने', clauseRef: 'नियम ३१ख(६)', isMandatory: true },
        { id: 'cs-5-2', label: 'नयाँ साधन वा उपकरण आपूर्ति भएपछि प्राविधिक विज्ञबाट परीक्षण (Testing & Commissioning) गराउने', clauseRef: 'नियम ११५', isMandatory: true },
        { id: 'cs-5-3', label: 'जिन्सी दाखिला प्रतिवेदन (MSR) तयार गरी भुक्तानी दिने', clauseRef: 'नियम ११५', isMandatory: true },
      ],
      requiredDocs: [
        '५% कार्यसम्पादन जमानत',
        'हस्ताक्षरित खरिद सम्झौता पत्र',
        'कमिसनिङ तथा परीक्षण प्रतिवेदन',
        'जिन्सी दाखिला प्रतिवेदन (MSR)',
      ],
      redFlags: [
        'पुरानो वा रिफर्बिस्ड साधन/यन्त्र स्वीकार गरेमा भ्रष्टाचारजन्य कसुर मानिन्छ।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'दाखिला तथा सम्पन्नता प्रमाणपत्र ढाँचा',
    },
  ],

  // 10. Force Account (अमानतबाट निर्माण कार्य)
  'force-account': [
    {
      stepNo: 1,
      titleNepali: 'अमानतबाट गर्नुपर्ने औचित्य पुष्टि र प्रारम्भिक लागत अनुमान',
      titleEnglish: 'Justification for Force Account & Initial Estimate',
      targetTimeline: 'कार्य प्रारम्भ गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४५, नियमावली नियम ९८',
      tasks: [
        { id: 'fa-1-1', label: 'लागत अनुमान तयार गर्न नसकिने साना मर्मत, सरसफाइ वा आकस्मिक विपद्को औचित्य पुष्टि गर्ने', clauseRef: 'ऐन दफा ४५', isMandatory: true },
        { id: 'fa-1-2', label: 'कामको परिमाण र आवश्यक सामग्री तथा कामदार ज्यालाको प्रारम्भिक अनुमान तयार गर्ने', clauseRef: 'नियम ९८', isMandatory: true },
      ],
      requiredDocs: [
        'अमानतको औचित्य पुष्टि टिप्पणी',
        'प्रारम्भिक अनुमानित खर्च विवरण',
        'कार्यस्थल अवस्था तस्बिर',
      ],
      redFlags: [
        'नियमित ठूला संरचना वा ठेक्काबाट गर्न सकिने काम अमानतबाट गर्न सख्त निषेध छ।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'एक तह माथिको अधिकारीको पूर्व स्वीकृति',
      titleEnglish: 'Prior Approval from One Level Higher Authority',
      targetTimeline: 'कार्य सुरु गर्नुपूर्व अनिवार्य',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४५, नियमावली नियम ९८(१)',
      tasks: [
        { id: 'fa-2-1', label: 'दफा ४५(१)(क) र (ग) बाहेकका कामका लागि १ तह माथिको अधिकारी (विभागीय प्रमुख/मन्त्रालय) लाई लेखी पठाउने', clauseRef: 'नियम ९८(१)', isMandatory: true },
        { id: 'fa-2-2', label: 'माथिल्लो निकायबाट अमानतबाट कार्य गराउने आधिकारिक पूर्व स्वीकृति प्राप्त गर्ने', clauseRef: 'नियम ९८(१)', isMandatory: true },
      ],
      requiredDocs: [
        'एक तह माथिको अधिकारीलाई पठाइएको पत्र',
        'पूर्व स्वीकृति निर्णयको आधिकारिक पत्र',
      ],
      redFlags: [
        'पूर्व स्वीकृति नलिई अमानतबाट काम सुरु गरेमा सम्पूर्ण खर्च बेरुजु ठहरिन्छ।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'अमानत पूर्व स्वीकृति सम्बन्धी टिप्पणी ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'निर्माण सामग्री खरिद र ज्यालादारी कामदार परिचालन',
      titleEnglish: 'Material Procurement & Daily Wage Labor Mobilization',
      targetTimeline: 'कार्य सञ्चालन अवधिभर',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९८(२)',
      tasks: [
        { id: 'fa-3-1', label: 'आवश्यक पर्ने निर्माण सामग्री ऐन/नियम बमोजिम खरिद गरी मौज्दात गर्ने', clauseRef: 'नियम ९८(२)', isMandatory: true },
        { id: 'fa-3-2', label: 'जिल्ला दररेट अनुसार दैनिक ज्यालादारीमा कामदार परिचालन गर्ने', clauseRef: 'नियम ९८(२)', isMandatory: true },
        { id: 'fa-3-3', label: 'प्राविधिक कर्मचारीको प्रत्यक्ष रोहबरमा दैनिक उपस्थिति र कामको लग राख्ने', clauseRef: 'नियम ९८(२)', isMandatory: true },
      ],
      requiredDocs: [
        'सामग्री खरिद बिल तथा जिन्सी दाखिला',
        'कामदारको दैनिक उपस्थिति पुस्तिका (Daily Log Book)',
        'जिल्ला ज्याला दररेट प्रतिलिपि',
      ],
      redFlags: [
        'निर्माण व्यवसायीलाई कामदार आपूर्ति वा पेटी ठेक्का दिन पाइँदैन; कार्यालय आफैँले काम गराउनुपर्छ।',
      ],
      templateId: 'tmpl-direct-purchase-order',
      templateLabel: 'सामग्री खरिद तथा कामदार परिचालन आदेश ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'नापजाँच, मस्टररोल भुक्तानी र खर्च फरफारक',
      titleEnglish: 'Measurement, Muster Roll Payment & Expense Clearance',
      targetTimeline: 'कार्य सम्पन्न भएको १५ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९८(३), नियम १२५',
      tasks: [
        { id: 'fa-4-1', label: 'सम्पन्न कामको प्राविधिक नापजाँच (MB) गर्ने', clauseRef: 'नियम ९८', isMandatory: true },
        { id: 'fa-4-2', label: 'कामदारको सहिछापसहितको मस्टररोल (ज्याला भरपाई) रुजु गरी भुक्तानी दिने', clauseRef: 'नियम ९८', isMandatory: true },
        { id: 'fa-4-3', label: 'खर्च फरफारक प्रतिवेदन स्वीकृत गरी कार्य सम्पन्न गर्ने', clauseRef: 'नियम १२५', isMandatory: true },
      ],
      requiredDocs: [
        'नाप किताब (Measurement Book - MB)',
        'कामदार ज्याला मस्टररोल (Muster Roll)',
        'सामग्री खपत विवरण',
        'कार्य सम्पन्न तथा खर्च फरफारक प्रतिवेदन',
      ],
      redFlags: [
        'कामदारको हस्ताक्षर/औंठाछाप विना वा फर्जी मस्टररोल बनाएमा सिधै आर्थिक अनुशासन उल्लंघन हुन्छ।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'कार्य सम्पन्न तथा खर्च फरफारक प्रमाणपत्र ढाँचा',
    },
  ],

  // 11. EPC / Turnkey (ई.पी.सी. डिजाइन र निर्माण टर्नकी)
  'epc-turnkey': [
    {
      stepNo: 1,
      titleNepali: 'सम्भाव्यता अध्ययन, कन्सेप्चुअल डिजाइन र समायोजन लागत अनुमान',
      titleEnglish: 'Feasibility Study, Conceptual Design & Adjusted Estimate',
      targetTimeline: 'खरिद प्रक्रिया सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ६६क, नियमावली नियम ३, नियम १०(८), अनुसूची १ग',
      tasks: [
        { id: 'epc-1-1', label: 'प्राविधिक, आर्थिक र वातावरणीय सम्भाव्यता अध्ययन सम्पन्न गर्ने', clauseRef: 'नियम ३(१)(ट)', isMandatory: true },
        { id: 'epc-1-2', label: 'प्रारम्भिक कन्सेप्चुअल डिजाइन र कार्यसम्पादन सूचक (KPIs) तयार गर्ने', clauseRef: 'नियम २१', isMandatory: true },
        { id: 'epc-1-3', label: 'मुद्रास्फीति र आयोजना अवधि समायोजन गरी अनुसूची १ग अनुसार लागत अनुमान मन्त्रालयबाट स्वीकृत गराउने', clauseRef: 'नियम १०(८), अनुसूची १ग', isMandatory: true },
      ],
      requiredDocs: [
        'सम्भाव्यता अध्ययन तथा वातावरणीय प्रतिवेदन (EIA/IEE)',
        'कन्सेप्चुअल डिजाइन तथा कार्यसम्पादन सूचक (KPIs)',
        'अनुसूची १ग बमोजिमको समायोजन लागत अनुमान',
        'मन्त्रालय/सचिवको स्वीकृति निर्णय',
      ],
      redFlags: [
        'प्रारम्भिक सम्भाव्यता अध्ययन र वातावरणीय स्वीकृति नगरी EPC मा जान पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'दुई खाम EPC बोलपत्र आह्वान (प्राविधिक र आर्थिक ५०-५० अङ्कभार)',
      titleEnglish: 'Two-Envelope EPC Bidding (50:50 Technical & Financial Weight)',
      targetTimeline: 'कम्तीमा २१ दिन (ICB भए ३० दिन)',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम २१, २६क, ४९',
      tasks: [
        { id: 'epc-2-1', label: 'PPMO को EPC/Turnkey मानक बोलपत्र कागजात (SBD) प्रयोग गर्ने', clauseRef: 'नियम २१', isMandatory: true },
        { id: 'epc-2-2', label: 'प्राविधिक ५० र आर्थिक ५० अङ्कभार छुट्ट्याई दुई खाम विधि तय गर्ने', clauseRef: 'नियम २६क', isMandatory: true },
        { id: 'epc-2-3', label: 'कम्तीमा ५ वर्षको त्रुटि सच्याउने अवधि (DLP) सर्त समावेश गर्ने', clauseRef: 'नियम २२(२)', isMandatory: true },
        { id: 'epc-2-4', label: 'राष्ट्रिय/अन्तर्राष्ट्रिय सूचना पत्रिका तथा e-GP मा प्रकाशन गर्ने', clauseRef: 'नियम ४९', isMandatory: true },
      ],
      requiredDocs: [
        'स्वीकृत EPC बोलपत्र कागजात (SBD)',
        'प्रकाशित बोलपत्र आह्वान सूचना',
      ],
      redFlags: [
        'डिजाइन तथा भौगोलिक सम्पूर्ण जोखिम निर्माण व्यवसायीले व्यहोर्ने स्पष्ट प्रावधान हुनुपर्छ (नियम १११क)।',
      ],
      templateId: 'tmpl-ifb-ncb',
      templateLabel: 'बोलपत्र आह्वानको सूचनाको ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'प्राविधिक प्रस्ताव खोल्ने, डिजाइन तथा क्षमता मूल्याङ्कन',
      titleEnglish: 'Technical Bid Opening & Design/Capacity Evaluation',
      targetTimeline: 'दाखिला भएको दिन खोल्ने, २१ दिनमा मूल्याङ्कन',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम २६क, नियम ६५ख',
      tasks: [
        { id: 'epc-3-1', label: 'प्राविधिक प्रस्ताव मात्र खोली आर्थिक खाम सुरक्षित राख्ने', clauseRef: 'नियम २६क', isMandatory: true },
        { id: 'epc-3-2', label: 'निर्माण व्यवसायीको विस्तृत डिजाइन अवधारणा, विशेषज्ञ जनशक्ति र विगत EPC अनुभव मूल्याङ्कन गर्ने', clauseRef: 'नियम ६५ख', isMandatory: true },
        { id: 'epc-3-3', label: 'प्राविधिक ५० अङ्कभार मध्ये उत्तीर्णाङ्क ल्याउने फर्महरूको सूची स्वीकृत गर्ने', clauseRef: 'नियम २६क', isMandatory: true },
      ],
      requiredDocs: [
        'प्राविधिक प्रस्ताव खोल्ने मुचुल्का',
        'डिजाइन तथा प्राविधिक मूल्याङ्कन प्रतिवेदन',
        'प्राविधिक अङ्क तालिका',
      ],
      redFlags: [
        'कमजोर इन्जिनियरिङ डिजाइन वा अनुभवहीन फर्मलाई प्राविधिक रूपमा उत्तीर्ण गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-bid-opening-minutes',
      templateLabel: 'बोलपत्र खोल्ने सार्वजनिक मुचुल्का ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'आर्थिक प्रस्ताव खोल्ने, संयुक्त अङ्क र न्यूनतम मूल्याङ्कित छनोट',
      titleEnglish: 'Financial Opening, 50:50 Combined Score & LOI',
      targetTimeline: 'प्राविधिक पश्चात् ७ दिनको सूचना दिई',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम २६क, ६५ङ, ६५छ, ऐन दफा २७',
      tasks: [
        { id: 'epc-4-1', label: 'उत्तीर्ण फर्महरूको आर्थिक प्रस्ताव खोली कबोल अङ्क पढेर सुनाउने', clauseRef: 'नियम ६५ङ', isMandatory: true },
        { id: 'epc-4-2', label: 'प्राविधिक (५०) र आर्थिक (५०) संयुक्त अङ्क गणना गरी अधिकतम अङ्क ल्याउने छनोट गर्ने', clauseRef: 'नियम ६५छ', isMandatory: true },
        { id: 'epc-4-3', label: 'सफल बोलपत्रदाताको नाममा ७ (सात) दिने आशयको सूचना (LOI) प्रकाशित गर्ने', clauseRef: 'ऐन दफा २७(२)', isMandatory: true },
      ],
      requiredDocs: [
        'आर्थिक प्रस्ताव खोल्ने मुचुल्का',
        'संयुक्त ५०:५० मूल्याङ्कन प्रतिवेदन',
        '७ दिने LOI सूचना',
      ],
      redFlags: [
        'एकमुष्ट Lump Sum मूल्यमा आधारित हुने हुँदा परिमाण घटीबढीको आधारमा दररेट परिवर्तन गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-loi',
      templateLabel: 'आशयको सूचनाको ढाँचा (LOI)',
    },
    {
      stepNo: 5,
      titleNepali: '१०% कार्यसम्पादन जमानत, EPC सम्झौता र विस्तृत डिजाइन स्वीकृति',
      titleEnglish: 'Performance Security, EPC Agreement & Detailed Design Approval',
      targetTimeline: 'LOI पश्चात् १५ दिनमा सम्झौता',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम २१, २२, ११०',
      tasks: [
        { id: 'epc-5-1', label: 'कबोल रकमको ५ देखि १०% कार्यसम्पादन जमानत बुझ्ने', clauseRef: 'नियम ११०', isMandatory: true },
        { id: 'epc-5-2', label: 'एकमुष्ट Lump Sum EPC सम्झौता सम्पन्न गर्ने', clauseRef: 'नियम २१', isMandatory: true },
        { id: 'epc-5-3', label: 'व्यवसायीले पेस गरेको विस्तृत डिजाइन सरकारी विशेषज्ञ/परामर्शदाताबाट पुनरावलोकन र स्वीकृति गराउने', clauseRef: 'नियम २१', isMandatory: true },
      ],
      requiredDocs: [
        'कार्यसम्पादन बैंक जमानत',
        'हस्ताक्षरित EPC सम्झौता पत्र',
        'विस्तृत इन्जिनियरिङ डिजाइन स्वीकृति पत्र',
      ],
      redFlags: [
        'विस्तृत डिजाइन सार्वजनिक निकायबाट स्वीकृत नभई साइटमा स्थायी निर्माण सुरु गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-contract-agreement',
      templateLabel: 'सार्वजनिक खरिद सम्झौताको ढाँचा',
    },
    {
      stepNo: 6,
      titleNepali: 'परीक्षण, कमिसनिङ, ५ वर्षे DLP र हस्तान्तरण',
      titleEnglish: 'Testing, Commissioning, 5-Year DLP & Handover',
      targetTimeline: 'सम्झौता सम्पन्न र ५ वर्षे DLP अवधि',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम २२(२), नियम ११८(७), नियम १२५',
      tasks: [
        { id: 'epc-6-1', label: 'निर्माण सम्पन्न पश्चात् परीक्षण तथा कमिसनिङ (Testing & Commissioning) सम्पन्न गर्ने', clauseRef: 'नियम १२५', isMandatory: true },
        { id: 'epc-6-2', label: 'कार्य सम्पन्न प्रमाणपत्र जारी गर्ने र एज-बिल्ट नक्सा बुझ्ने', clauseRef: 'नियम १२५', isMandatory: true },
        { id: 'epc-6-3', label: '५ वर्षको त्रुटि सच्याउने अवधि (DLP) र सञ्चालन/मर्मत सम्भारको ग्यारेन्टी कार्यान्वयन गर्ने', clauseRef: 'नियम २२(२)', isMandatory: true },
      ],
      requiredDocs: [
        'परीक्षण तथा कमिसनिङ प्रमाणपत्र',
        'एज-बिल्ट नक्सा (As-Built Drawings)',
        'कार्य सम्पन्न प्रमाणपत्र',
        '५ वर्षे DLP मर्मत सम्झौता पत्र',
      ],
      redFlags: [
        'सार्वजनिक निकायले काम थप गर्न लगाएको बाहेक EPC मा कुनै पनि भेरिएसन आदेश जारी गर्न पाइँदैन (नियम ११८(७))।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'कार्य सम्पन्न प्रमाणपत्र ढाँचा',
    },
  ],

  // 12. NGO Procurement (गैरसरकारी संस्थाबाट काम)
  'ngo-procurement': [
    {
      stepNo: 1,
      titleNepali: 'कामको आवश्यकता, TOR र लागत अनुमान (रु १० लाख सम्म)',
      titleEnglish: 'Needs Assessment, TOR & Cost Estimate (Up to 10 Lakhs)',
      targetTimeline: 'कार्यक्रम सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४६, नियमावली नियम ९९',
      tasks: [
        { id: 'ngo-1-1', label: 'जनचेतना अभिवृद्धि, समुदाय परिचालन वा तालिम सम्बन्धी कामको आवश्यकता पुष्टि गर्ने', clauseRef: 'ऐन दफा ४६', isMandatory: true },
        { id: 'ngo-1-2', label: 'कार्यक्षेत्रगत सर्त (TOR) र रु १० लाख भित्रको लागत अनुमान तयार गर्ने', clauseRef: 'नियम ९९(१)', isMandatory: true },
        { id: 'ngo-1-3', label: 'कार्यालय प्रमुखबाट लागत अनुमान स्वीकृत गराउने', clauseRef: 'नियम ९९(१)', isMandatory: true },
      ],
      requiredDocs: [
        'कार्यक्षेत्रगत सर्त (TOR)',
        'स्वीकृत लागत अनुमान',
        'NGO बाट काम गराउने औचित्य टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'रु १० लाख भन्दा माथिको कामलाई यो विधिबाट गराउन पाइँदैन; खुला परामर्श सेवामा जानुपर्छ।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'लागत अनुमान स्वीकृत गर्ने टिप्पणी तथा आदेश ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'मौजुदा सूची (Standing List) का NGO लाई १५ दिने प्रस्ताव आह्वान',
      titleEnglish: '15-Day Proposal Invitation to Listed NGOs',
      targetTimeline: 'कम्तीमा १५ दिनको म्याद',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९९(२), नियम ९९(३)',
      tasks: [
        { id: 'ngo-2-1', label: 'नियम १८ बमोजिम दर्ता भएका मौजुदा सूचीका NGO हरू यकिन गर्ने', clauseRef: 'नियम १८', isMandatory: true },
        { id: 'ngo-2-2', label: 'राष्ट्रिय वा स्थानीय दैनिक पत्रिकामा कम्तीमा १५ दिनको म्याद दिई प्रस्ताव आह्वान गर्ने', clauseRef: 'नियम ९९(२)', isMandatory: true },
      ],
      requiredDocs: [
        'मौजुदा सूची (Standing List) दर्ता प्रमाण',
        'प्रस्ताव आह्वान सूचना तथा पत्रिका कटिङ',
      ],
      redFlags: [
        'मौजुदा सूचीमा दर्ता नभएका वा समाज कल्याण परिषद्मा नवीकरण नभएका संस्था सहभागी हुन पाउँदैनन्।',
      ],
      templateId: 'tmpl-notesheet-ifb',
      templateLabel: 'प्रस्ताव आह्वान सम्बन्धी टिप्पणी ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'प्रस्ताव खोल्ने, मूल्याङ्कन र न्यूनतम मूल्याङ्कित छनोट',
      titleEnglish: 'Proposal Opening, Evaluation & Selection',
      targetTimeline: 'खोलेको ७ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९९(४), नियम ९९(५)',
      tasks: [
        { id: 'ngo-3-1', label: 'दर्ता भएका प्रस्तावहरू सार्वजनिक रूपमा खोल्ने', clauseRef: 'नियम ९९(४)', isMandatory: true },
        { id: 'ngo-3-2', label: 'मूल्याङ्कन समितिले TOR बमोजिम जनशक्ति र कार्यविधि पूरा गरेको जाँच्ने', clauseRef: 'नियम ९९(५)', isMandatory: true },
        { id: 'ngo-3-3', label: 'न्यूनतम रकम प्रस्ताव गर्ने संस्था छनोट गरी कार्यालय प्रमुखबाट स्वीकृत गराउने', clauseRef: 'नियम ९९(५)', isMandatory: true },
      ],
      requiredDocs: [
        'प्रस्ताव खोल्ने मुचुल्का',
        'मूल्याङ्कन प्रतिवेदन (Evaluation Report)',
        'छनोट निर्णय टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'TOR का सर्त पूरा नगर्ने संस्थालाई न्यूनतम रकम कबोल गरेको आधारमा मात्र छनोट गर्न पाइँदैन।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'प्रस्ताव मूल्याङ्कन तथा छनोट निर्णय टिप्पणी',
    },
    {
      stepNo: 4,
      titleNepali: 'द्विपक्षीय सम्झौता, कार्यक्रम कार्यान्वयन र प्रगति प्रतिवेदन',
      titleEnglish: 'Bilateral Agreement, Execution & Progress Reporting',
      targetTimeline: 'सम्झौता अनुसारको अवधिभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९९(६)',
      tasks: [
        { id: 'ngo-4-1', label: 'गैरसरकारी संस्थासँग कार्यक्रम सञ्चालन सम्झौता सम्पन्न गर्ने', clauseRef: 'नियम ९९(६)', isMandatory: true },
        { id: 'ngo-4-2', label: 'प्रगतिको आधारमा किस्ताबन्दीमा भुक्तानी निकासा दिने', clauseRef: 'नियम ९९(६)', isMandatory: true },
        { id: 'ngo-4-3', label: 'स्थलगत अनुगमन गरी कार्यक्रम सम्पन्न प्रतिवेदन र खर्च भरपाई रुजु गर्ने', clauseRef: 'नियम ९९(६)', isMandatory: true },
      ],
      requiredDocs: [
        'कार्यक्रम सम्झौता पत्र',
        'स्थलगत अनुगमन प्रतिवेदन',
        'कार्यक्रम सम्पन्न प्रतिवेदन तथा अडिट बिल भरपाई',
      ],
      redFlags: [
        'कार्यक्रमको प्रत्यक्ष प्रभाव र सहभागीको उपस्थिति विना अन्तिम किस्ता भुक्तानी दिन पाइँदैन।',
      ],
      templateId: 'tmpl-work-completion-cert',
      templateLabel: 'कार्य सम्पन्न प्रमाणपत्र ढाँचा',
    },
  ],

  // 13. House Rent & Service (घरजग्गा भाडा तथा सेवा करार)
  'rent-service': [
    {
      stepNo: 1,
      titleNepali: 'घरभाडा/सेवा आवश्यकता पहिचान र क्षेत्रफल/TOR स्वीकृति',
      titleEnglish: 'Identification of Space/Service Needs & TOR Approval',
      targetTimeline: 'प्रक्रिया सुरु गर्नु अगावै',
      legalBasis: 'सार्वजनिक खरिद ऐन दफा ४३, नियमावली नियम ९४, ९५',
      tasks: [
        { id: 'rs-1-1', label: 'सरकारी भवन उपलब्ध नभएको यकिन गरी घरभाडाको आवश्यकता पुष्टि गर्ने', clauseRef: 'नियम ९४', isMandatory: true },
        { id: 'rs-1-2', label: 'आवश्यक क्षेत्रफल, कोठा संख्या, पार्किङ वा सेवा करारको जनशक्ति र सर्त तय गर्ने', clauseRef: 'नियम ९४, ९५', isMandatory: true },
        { id: 'rs-1-3', label: 'कार्यालय प्रमुखबाट घरभाडा/सेवा करार सम्बन्धी विवरण स्वीकृत गराउने', clauseRef: 'नियम १४', isMandatory: true },
      ],
      requiredDocs: [
        'घरभाडा/सेवा माग औचित्य टिप्पणी',
        'आवश्यक क्षेत्रफल/सुविधा विवरण',
        'सेवा करार TOR',
      ],
      redFlags: [
        'सरकारी स्वामित्वको उपयुक्त भवन उपलब्ध छ/छैन पहिले यकिन गर्नुपर्छ।',
      ],
      templateId: 'tmpl-notesheet-estimate',
      templateLabel: 'आवश्यकता तथा दर विश्लेषण टिप्पणी ढाँचा',
    },
    {
      stepNo: 2,
      titleNepali: 'सार्वजनिक सूचना प्रकाशन (घरभाडा ७-१५ दिन, सेवा करार १५ दिन)',
      titleEnglish: 'Public Notice (Rent 7-15 Days, Services 15 Days)',
      targetTimeline: 'घरभाडा: केन्द्र १५ दिन, जिल्ला ७ दिन; सेवा करार: १५ दिन',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९४(१), नियम ९५(३)',
      tasks: [
        { id: 'rs-2-1', label: 'घरभाडाका लागि केन्द्रमा १५ दिन र जिल्लामा ७ दिनको सार्वजनिक सूचना निकाल्ने', clauseRef: 'नियम ९४(१)', isMandatory: true },
        { id: 'rs-2-2', label: 'रु १० लाख माथिको सेवा करार भए १५ दिनको राष्ट्रिय सूचना निकाल्ने (१० लाख मुनि सोझै वार्ता)', clauseRef: 'नियम ९५(३)', isMandatory: true },
        { id: 'rs-2-3', label: 'घरधनी वा सेवा प्रदायकबाट सिलबन्दी प्रस्ताव माग गर्ने', clauseRef: 'नियम ९४, ९५', isMandatory: true },
      ],
      requiredDocs: [
        'घरभाडा/सेवा आह्वान सूचना',
        'पत्रिका कटिङ तथा सूचना पाटी टाँस मुचुल्का',
        'घरधनीको लालपुर्जा, नक्सापास र कर चुक्ता प्रमाण',
      ],
      redFlags: [
        'स्वामित्व विवाद भएको वा रोक्का रहेको घरजग्गा भाडामा लिन पाइँदैन।',
      ],
      templateId: 'tmpl-rent-service-agreement',
      templateLabel: 'घरजग्गा भाडा तथा सेवा करार आह्वान ढाँचा',
    },
    {
      stepNo: 3,
      titleNepali: 'घरभाडा निर्धारण समिति स्थलगत निरीक्षण / सेवा मूल्याङ्कन',
      titleEnglish: 'Site Inspection by Rent Assessment Committee / Service Evaluation',
      targetTimeline: 'सूचना म्याद सकिएको ७ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९४(६), नियम ९५(६)',
      tasks: [
        { id: 'rs-3-1', label: 'प्रमुख जिल्ला अधिकारी (CDO) को अध्यक्षतामा गठित समितिबाट स्थलगत निरीक्षण गराउने', clauseRef: 'नियम ९४(६)', isMandatory: true },
        { id: 'rs-3-2', label: 'समितिले तोकेको सरकारी दररेटको अधीनमा रही घरभाडा निर्धारण गर्ने', clauseRef: 'नियम ९४(६)', isMandatory: true },
        { id: 'rs-3-3', label: 'सेवा करारमा न्यूनतम मूल्य कबोल गर्ने इजाजतप्राप्त सेवा प्रदायक छनोट गर्ने', clauseRef: 'नियम ९५(६)', isMandatory: true },
      ],
      requiredDocs: [
        'घरभाडा निर्धारण समिति स्थलगत मुचुल्का तथा निर्णय',
        'सेवा करार मूल्याङ्कन प्रतिवेदन',
        'छनोट निर्णय टिप्पणी तथा आदेश',
      ],
      redFlags: [
        'घरभाडा निर्धारण समितिले तोकेको दररेट भन्दा बढी मूल्यमा घर भाडा लिन सख्त मनाही छ।',
      ],
      templateId: 'tmpl-notesheet-evaluation',
      templateLabel: 'दररेट निर्धारण तथा छनोट टिप्पणी ढाँचा',
    },
    {
      stepNo: 4,
      titleNepali: 'द्विपक्षीय करार सम्झौता, कार्यसम्पादन जमानत र मासिक भुक्तानी',
      titleEnglish: 'Bilateral Contract, Security & Monthly Payments',
      targetTimeline: 'निर्णय भएको ७ दिनभित्र',
      legalBasis: 'सार्वजनिक खरिद नियमावली नियम ९४(८), नियम ९५(६)',
      tasks: [
        { id: 'rs-4-1', label: 'घरधनीसँग घरभाडा सम्झौता वा सेवा प्रदायकसँग ५% कार्यसम्पादन जमानत लिई सेवा सम्झौता गर्ने', clauseRef: 'नियम ९४(८), ९५(६)', isMandatory: true },
        { id: 'rs-4-2', label: 'सेवा प्रदायकका कर्मचारीको SSF आबद्धता र न्यूनतम पारिश्रमिक सुनिश्चित गर्ने', clauseRef: 'ऐन दफा ५२ख', isMandatory: true },
        { id: 'rs-4-3', label: 'मासिक बिल र कर कट्टा (TDS) गरी मासिक रूपमा भुक्तानी दिने', clauseRef: 'नियम १२३', isMandatory: true },
      ],
      requiredDocs: [
        'घरभाडा सम्झौता / सेवा करार सम्झौता पत्र',
        'सेवा प्रदायकको ५% कार्यसम्पादन जमानत',
        'SSF सूचीकरण प्रमाण',
        'मासिक कर कट्टा (TDS) भौचर र बिल',
      ],
      redFlags: [
        'घरबहाल कर (१०%) कट्टा नगरी घरधनीलाई भुक्तानी गरेमा लेखा अधिकृत जिम्मेवार हुनेछ।',
      ],
      templateId: 'tmpl-contract-agreement',
      templateLabel: 'द्विपक्षीय करार सम्झौता ढाँचा',
    },
  ],
};

// Fallback default milestones
export const DEFAULT_MILESTONES = METHOD_WORKFLOWS['ncb-works'];
