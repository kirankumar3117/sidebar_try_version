import Sidebar from "./SideBar.vue";
import SidebarItem from "./SidebarItem.vue";
import { reactive } from "vue";
const SidebarStore = reactive({
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  breakpoint: 1200,
  hovered: false,
  displaySidebar(value) {
    if (window.innerWidth > this.breakpoint) {
      return;
    }
    this.isMinimized = !value;
    this.showSidebar = value;
    let docClasses = document.body.classList;
    if (value) {
      docClasses.add("g-sidenav-pinned");
      docClasses.add("g-sidenav-show");
      docClasses.remove("g-sidenav-hidden");
    } else {
      docClasses.add("g-sidenav-hidden");
      docClasses.remove("g-sidenav-pinned");
      docClasses.remove("g-sidenav-show");
    }
  },
  toggleMinimize() {
    console.log("minimize");
    // document.body.classList.remove("g-sidenav-pinned");
    this.isMinimized = !this.isMinimized;
    let docClasses = document.body.classList;

    if (window.innerWidth <= 820) {
      this.hovered = false; ///
      if (!this.isMinimized) {
        // document.body.classList.remove("g-sidenav-pinned");
        let docClasses = document.body.classList;
        docClasses.add("g-sidenav-hidden");
        docClasses.remove("g-sidenav-show");
        docClasses.add("g-sidenav-hide");
        // setTimeout(() => {
          docClasses.remove("g-sidenav-hide");
          docClasses.add("g-sidenav-hidden");
        // },0);
      }
    }
    if (this.isMinimized) {
      docClasses.add("g-sidenav-hidden");
      docClasses.remove("g-sidenav-pinned");
      docClasses.remove("g-sidenav-show");
    } else {
      docClasses.add("g-sidenav-pinned");
      docClasses.add("g-sidenav-show");
      docClasses.remove("g-sidenav-hidden");
    }
    if (this.hovered) {
      docClasses.add("g-sidenav-show");
    }
  },
  onMouseEnter() {
    document.body.classList.add("g-sidenav-pinned");
    this.hovered = true;
    if (this.isMinimized) {
      document.body.classList.add("g-sidenav-show");
      document.body.classList.remove("g-sidenav-hidden");
    }
  },
  onMouseLeave() {
    console.log("outside click");
    this.hovered = false; ///
    if (this.isMinimized) {
      document.body.classList.remove("g-sidenav-pinned");
      let docClasses = document.body.classList;
      docClasses.remove("g-sidenav-show");
      docClasses.add("g-sidenav-hide");
      setTimeout(() => {
        docClasses.remove("g-sidenav-hide");
        docClasses.add("g-sidenav-hidden");
      }, 300);
    }
  },
});

const SidebarPlugin = {
  install(app, options) {
    if (options && options.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks;
    }
    app.config.globalProperties.$sidebar = SidebarStore;
    app.component("side-bar", Sidebar);
    app.component("sidebar-item", SidebarItem);
  },
};

export default SidebarPlugin;