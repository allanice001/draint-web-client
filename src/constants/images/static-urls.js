const PREFIX =
  'https://s3.eu-west-2.amazonaws.com/media.draintart.gallery/media/static/';
const POSTFIX_PNG = '/source.png';
const POSTFIX_SVG = '/source.svg';

const categories = {
  image: {
    addArtworkToProfile: '88ec78be-9681-4c06-a158-fb474c977c71',
    artist: '3ebea3ab-c0c7-4448-9820-8db2e8f753cb',
    collector: '85451731-3c92-4e0f-8cec-a4c7c22e24c0',
    artworkPlaceholder: '3b5dd3b5-c758-47fe-9788-bc40db46e9e7',
    avatarPlaceholder: 'a057de9d-1e82-4a2e-9e77-ea834f99c852',
    buildingProfile: '9e596216-847f-401f-b40e-f86072b835e0',
    defaultArtist: '9c51acb6-b297-4ad5-98fc-300fb4703902',
    defaultPost: 'd840b4e1-cb41-4729-8fab-9ff8943bc719',
    delivery: 'cad9ff68-510a-48a6-9b85-43b74506ae27',
    deliveryman: '012af3aa-7208-4d3f-96b3-361e6ef1e6ca',
    emptyPage: '8849c1b7-2a3d-4ac0-b568-a2de325cf90e',
    manageBilling: 'de5b766f-48bf-4209-b02b-0c428ff6b082',
    noImage: 'ce946886-b125-4141-a69e-58b4b464c556',
    paintColorful: '9c8cbaf2-1ad5-471c-9764-436084b42333',
    payoneer: 'dd94d3d6-4e78-4053-a631-ba0c634ef424',
    paypal: '3d1cf730-4132-44b4-8099-36ede4842da1',
    paypalIcon: 'a60548a4-88b1-4e75-a223-b339a19342b1',
    masterCardIcon: 'a1442de7-ffa2-4137-b219-b913b9d1bb58',
    visaIcon: '4e56108f-8af5-4ebf-ad41-df7dcfeeba39',
    rating: '9e113cca-3ff5-4a69-adb5-3d8e7407dc7e',
    socialMedia: '11af106e-adc5-46e8-ac8b-0bbf32bdb7be',
    socialMediaBlack: '7979ad5b-9c0c-4f56-a871-349b24f649fb',
    template: '102615ee-4ea5-4319-8a19-267fc0b87b57',
    logo: 'c29cea01-f05c-426e-bf96-eeb94b526534',
    logoCertificate: '9850419e-2311-4662-b4d2-72732b1391c1',
    growPortfolio: '2567394f-04ce-4d06-bc86-4e92ed8e79ff',

    packing1: '29843bc9-dde1-4d20-81fe-d36760e80398',
    packing2: '196fc48c-4450-4d4d-95ff-35374af473e5',
    packing3: '150a047d-0ab5-45e1-88f9-8ef50f707aad',
    packing4: '034e86c5-6c36-4153-8480-74912e7acaa5',
    packing5: 'be297ebe-88b9-4d10-9bb6-3726385b7313',
    packing6: '82590917-b489-4b4f-aa3a-a2ef5cb8664f',
  },
  screen: {
    artistProfile: 'efc5021d-634f-46b3-a7df-c91c55c4cd21',
    artworks: '3c1d513b-10ce-4556-9186-be97a475f75b',
    artworksFaded: '8ee118e2-6be3-445b-be06-f25611680bd8',
    certificate: '0e477c90-ab76-4521-b813-c491cf640660',
    contact: 'f6ee33dc-1392-4f40-a2d2-b2236145ac06',
    laptop: '5007cd02-7551-409b-8455-dbd7cb3dcb35',
    myStudio: '7772697e-25cf-4caf-837e-89fe015f722f',
    newArtworks: '3614afd9-93a2-466d-aace-9b67d77fe69c',
    paymentModal: '3bb65820-50b0-48c5-a4e0-e8b34247008c',
    priceChart: 'c775de09-5ed7-41a2-ad89-fd755941c6fc',
    priceFilter: '000798b9-7c5f-459b-a840-e228369a5c61',
    salesDashboard: '88b12c8d-dca9-44e1-8eda-ad31b03dea17',
    searchMap: '6720e036-c9c1-4563-a072-71244bb80e06',
    singleArtwork: '8115053e-ade2-4c4a-bae9-0d0151b6aef6',

    macbook: '4a2b7105-0256-4a26-b68f-d78c0c03ccbb',
    girl: 'be07d862-7e16-4056-a704-dd0b47dd5b21',
    quotes: '8684a7bc-b824-4902-abed-003dcb70f4ad',
    blogBG: '69fc3c02-27aa-455b-83cb-a677d34432cd',
    reviewBG: 'd82dc0da-17d6-46ff-9627-1b46e6b0b74a',
    femaleYongDesktop: '41e25960-f809-4725-a54f-6cab5850a1f3',
    femaleYongTablet: '7029df97-6c82-423c-ae54-0cee1c0e2889',
    femaleYongMobile: '8b72b384-00a4-4bf1-baaa-e7c3d8c52cfa',
  },
  svg: {
    atelier: 'bd751915-8fe9-4679-b5eb-bc9577bdaa76',
    earnMoney: '59ef9499-aa90-4728-ab28-f9ff32c67eaf',
    shipping: '7260281f-4076-4e3c-83a9-4d334452a606',
    support: 'e97b2463-c2b0-4c74-8b84-af840fcb3315',
    aboutMeIcon: '1711ca45-f8dc-4d98-bbe4-feb68905e2c6',
    contactIcon: '2f584677-12ce-483f-8ac9-78f9ee77fcd4',
    dashboardIcon: '0b819866-02c6-4130-a1a6-dfefe946571b',
    galleryIcon: '43dad386-fed6-4670-a60f-b5ccaa4d421b',
    klarnaIcon: 'ea2ecad3-ebe0-4b75-bb3d-b87c2b3246eb',
  },
};

const getStaticUrls = categories => {
  for (const category in categories) {
    for (const key in categories[category]) {
      const POSTFIX = category === 'svg' ? POSTFIX_SVG : POSTFIX_PNG;
      categories[category][key] =
        PREFIX + category + '/' + categories[category][key] + POSTFIX;
    }
  }

  return categories;
};

export default getStaticUrls(categories);
