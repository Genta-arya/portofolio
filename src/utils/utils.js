import Filter from "bad-words";

export const formatRupiah = (harga) => {
  return harga.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export const Filters = () => {
  const filter = new Filter();
  filter.addWords(
    "ancuk",
    "ancok",
    "ajig",
    "anjay",
    "anjing",
    "anying",
    "anjir",
    "asu",
    "asyu",
    "babangus",
    "babi",
    "bacol",
    "bacot",
    "bagong",
    "bajingan",
    "balegug",
    "banci",
    "bangke",
    "bangsat",
    "bedebah",
    "bedegong",
    "bego",
    "belegug",
    "beloon",
    "bencong",
    "bloon",
    "blo'on",
    "bodoh",
    "boloho",
    "buduk",
    "budug",
    "celeng",
    "cibai",
    "cibay",
    "cocot",
    "cocote",
    "cok",
    "cokil",
    "colai",
    "colay",
    "coli",
    "colmek",
    "conge",
    "congean",
    "congek",
    "congor",
    "cuk",
    "cukima",
    "cukimai",
    "cukimay",
    "dancok",
    "entot",
    "entotan",
    "ewe",
    "ewean",
    "gelo",
    "genjik",
    "germo",
    "gigolo",
    "goblo",
    "goblog",
    "goblok",
    "hencet",
    "henceut",
    "heunceut",
    "homo",
    "idiot",
    "itil",
    "jancuk",
    "jancok",
    "jablay",
    "jalang",
    "jembut",
    "jiancok",
    "jilmek",
    "jurig",
    "kacung",
    "kampang",
    "kampret",
    "kampungan",
    "kehed",
    "kenthu",
    "kentot",
    "kentu",
    "keparat",
    "kimak",
    "kintil",
    "kirik",
    "kunyuk",
    "kurap",
    "konti",
    "kontol",
    "kopet",
    "koplok",
    "lacur",
    "lebok",
    "lonte",
    "maho",
    "meki",
    "memek",
    "monyet",
    "ndas",
    "ndasmu",
    "ngehe",
    "ngentot",
    "nggateli",
    "nyepong",
    "ngewe",
    "ngocok",
    "pante",
    "pantek",
    "patek",
    "pathek",
    "peju",
    "pejuh",
    "pecun",
    "pecundang",
    "pelacur",
    "pelakor",
    "peler",
    "pepek",
    "puki",
    "pukima",
    "pukimae",
    "pukimak",
    "pukimay",
    "sampah",
    "sepong",
    "sial",
    "sialan",
    "silit",
    "sinting",
    "sontoloyo",
    "tai",
    "taik",
    "tempek",
    "tempik",
    "tete",
    "tetek",
    "tiembokne",
    "titit",
    "toket",
    "tolol",
    "ublag",
    "udik",
    "wingkeng",
    "mamak",
    "setan",
    "bapak kau",
    "layanan jelek",
    "tidak bermutu",
    "bodoh",
    "tidak memuaskan",
    "pokek",
    "pukimak",
    "celaka",
    "celake",
    "puake",
    "iblis",
    "bangsat",
    "kontol",
    "kontil",
    "kuntol",
    "jubur",
    "burit",
    "pantat",
    "peler",
    "pele",
    "titit",
    "titid",
    "memek",
    "kondom",
    "taik",
    "tt",
    "open bo",
    "bo",
    "pelacur",
    "Kurang fitur",
    "Kurang fungsi",
    "Ndas bedag",
    "Bungut gebuh",
    "Ndas keleng",
    "ibelis",
    "jin",
    "sethan",
    "t4ik",
    "taiks",
    "tahi",
    "syaitan",
    "syeitan",
    "penipu",
    "tukang tipu",
    "tipu",
    "nipu",
    "phising",
    "gacor",
    "judi bola",
    "www",
    ".com",
    "situs",
    "porno",
    "porn",
    "0",
    "8",
    "62",
    "6",
    "2"
  );
  return filter;
};

export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const commentTime = timestamp.toDate();
  const timeDifference = now - commentTime;

  const seconds = Math.floor(timeDifference / 1000);

  const minutes = Math.floor(seconds / 60);

  const hours = Math.floor(minutes / 60);

  const days = Math.floor(hours / 24);

  const months = Math.floor(days / 30);

  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} tahun yang lalu`;
  } else if (months > 0) {
    return `${months} bulan yang lalu`;
  } else if (days > 0) {
    return `${days} hari yang lalu`;
  } else if (hours > 0) {
    return `${hours} jam yang lalu`;
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`;
  } else {
    return `${seconds} detik yang lalu`;
  }
};
export const truncateName = (name, maxLength) => {
  if (name.length > maxLength) {
    return name.substring(0, maxLength) + "...";
  } else {
    return name;
  }
};
export const formatProjectName = (name) => {

  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};