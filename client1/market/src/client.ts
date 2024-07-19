import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "0b82230109766dbe6a86f49be9a89351";

export const client = createThirdwebClient({
  clientId: clientId,
});