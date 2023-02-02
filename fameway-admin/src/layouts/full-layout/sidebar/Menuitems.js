const Menuitems = [
  {
    title: "Accueil",
    icon: "home",
    href: "/home",
  },
  {
    title: "Ma boutique",
    icon: "shopping-cart",
    href: "/store/settings",
    collapse: true,
    children: [
      {
        title: "Commandes",
        icon: "package",
        href: "/store/order",
      },
      {
        title: "Articles",
        icon: "shopping-bag",
        href: "/store/articles",
      },
      {
        title: "Clients",
        icon: "user",
        href: "/store/clients",
      },
      {
        title: "Paramètres",
        icon: "tool",
        href: "/store/settings",
      },
    ],
  },
  {
    title: "Mon calendrier",
    icon: "calendar",
    href: "/dashboards/starter",
  },
  {
    title: "Mes messages",
    icon: "message-square",
    href: "/dashboards/starter",
  },
  {
    title: "Paramètres",
    icon: "settings",
    href: "/dashboards/starter",
  },
  {
    title: "Aide",
    icon: "help-circle",
    href: "/dashboards/starter",
  },
];

export default Menuitems;
