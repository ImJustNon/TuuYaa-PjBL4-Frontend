import { extendTheme, Theme } from "@chakra-ui/react";

const theme: Record<string, any> = extendTheme({
  components: {
        Drawer: {
            parts: ['dialog', 'header', 'body'],
            variants: {
                primary: {
                },
                secondary: {
                    dialog: {
                        maxW: "200px",
                    }
                }
            }
        }
    }
});

export default theme;