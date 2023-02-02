const Menuitems = [
  {
    title: "Accueil",
    icon: "home",
    href: "/home",
  },
  {
    title: "Ma boutique",
    icon: "shopping-cart",
    href: "/store",
    collapse: true,
    children: [
      {
        title: "Personnalisation",
        icon: "feather",
        href: "/store",
      },
      {
        title: "Ajouter un article",
        icon: "plus-circle",
        href: "/article/add",
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
