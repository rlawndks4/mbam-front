

const size = {
  mobileS: "480px",
  mobileL: "770px",
  tabletS: "1023px",
  tabletL: "1280px",
  laptop: "1460px",
  desktop: "1700px",
}

const theme = {
  color: {
    first: "#8e44ad",
    secondary: "#9b59b6",
    third: "#cd84f1",
    strong: "#1a1a1a",
    light: "#ababab",
    background0: "#3250d2",
    background1: "#3250d2",
    background2: "#FECC2F",
    background3: "#F4F4F4",
    font1: "#2E2D2D",
    font2: "#707070",
    font3: "#9A9A9A",
    font4: "#D6D6D5",
    font4: "#B5B5B5",
    font5: "#ddd",
    font6: "#f5f5f5",
    red: "#ff0000",
    blue: "#0058FF",
    cardColor: [
      { font: '#fff', background: '#024643' },
      { font: '#fff', background: '#31125A' },
      { font: '#fff', background: '#4A02CC' },
      { font: '#000', background: '#f5f6f8' },
    ],
    manager: {
      background1: "#3250d2",
      background2: "#3250d2",
      background3: "#f5f6f8",
      font1: "#495057",
      font2: "#596275",
      font3: "#7b8190",
    }
  },
  size: {
    font1: '27px',
    font2: '25px',
    font2_5: '22px',
    font3: '16px',
    font4: '14px',
    font5: '12px',
    font6: '10px',
    font7: '8px',
    font8: '6px',
    mobileS: `(max-width: ${size.mobileS})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tabletL: `(max-width: ${size.tabletL})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop})`,
  },
  font: {
    thin: "SpoqaHanSansNeo-Thin",
    light: "SpoqaHanSansNeo-Light",
    regular: "SpoqaHanSansNeo-Regular",
    medium: "SpoqaHanSansNeo-Medium",
    normal: "NanumSquareNeo-cBd"
  },
  boxShadow: "0px 12px 12px #00000029",
  borderRadius: "10px"
}

export default theme