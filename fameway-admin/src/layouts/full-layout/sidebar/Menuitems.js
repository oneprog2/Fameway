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
        href: "/store/orders",
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
    href: "/calendar",
  },
  {
    title: "Mes messages",
    icon: "message-square",
    href: "/messages",
  },
  {
    title: "Paramètres",
    icon: "settings",
    href: "/settings",
  },
  {
    title: "Aide",
    icon: "help-circle",
    href: "/help",
  },
];

export default Menuitems;
