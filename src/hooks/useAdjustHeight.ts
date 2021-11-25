/**
 * use to make : sourceHeight + destinationHeight = 100vh
 * @returns function
 */
const useAdjustHeight = () => {
  const adjustHeight = (
    sourceQuery: string,
    destinationQuery: string,
    offSet?: number
  ): void => {
    const navBar: HTMLElement = document.querySelector(
      sourceQuery
    ) as HTMLElement;
    const container: any = document.querySelector(destinationQuery);
    container.style.height = `calc( 100vh - ${
      navBar.clientHeight + (offSet || 0)
    }px )`;
  };
  return { adjustHeight };
};

export default useAdjustHeight;
