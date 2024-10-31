const getTheme = (domain: string) => {
  const theme = {
    default: {
      content: {
        project: "LinxWeb",
        d4signSafe: "Linx",
        phoneNumber: "",
        hubSlug: "padrao",
      },
      images: {
        favicon: "/images/linx/logolinx16x16.png"
      },
      colors: {
        sideBarButton: {
          "50": "#dd7f11",
        },
        brand: {
          "50": "#FDE8EB",
          "100": "#F9BEC8",
          "200": "#F494A5",
          "300": "#F06A82",
          "400": "#EC415F",
          "500": "#e92043",
          "600": "#8B0E24",
          "700": "#7e0e21",
          "800": "#5D0918",
          "900": "#2E050C",
        },
        brandSecond: {
          "50": "#ffffff",
          "100": "#F9BEC8",
          "500": "#e92043",
        },
        text: {
          first: "#333333",
          second: "#505050",
          third: "#707070",
          fourth: "#909090",
        },
        contrast: "#fefefe",
      },
    }
  };

  const palette =
    Object.entries(theme).find((theme) => domain.includes(theme[0]))?.[1] ||
    null;

  return palette || theme["default"];
};

export default getTheme;
