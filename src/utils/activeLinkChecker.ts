const activeLinkChecker = (href, path) => {
  if (
    (href !== "/" && path.includes(href)) ||
    path === href ||
    (path.includes("hospital") && href === "/")
  ) {
    return "text-purple border-b-4 border-purple";
  } else {
    return "text-gray-600";
  }
};

export default activeLinkChecker;
