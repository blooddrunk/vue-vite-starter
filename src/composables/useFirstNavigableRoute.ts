export const useFirstNavigableRoute = (routeName?: string) => {
  const currentRoute = useRoute();
  const router = useRouter();

  watch(
    () => currentRoute.name,
    (value) => {
      if (!routeName || routeName === value) {
        const { targetRoute } = routeName
          ? useFirstNavigableMenu(routeName)
          : useFirstNavigableMenu();
        if (targetRoute) {
          router.push(targetRoute);
        }
      }
    },
    { immediate: true }
  );
};
