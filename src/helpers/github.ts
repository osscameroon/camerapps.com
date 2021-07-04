export const extractHandleFromGitHubUrl = (url: string): string => {
  const urlArray: string[] = url?.split("/");
  return urlArray[urlArray.length - 1];
};
