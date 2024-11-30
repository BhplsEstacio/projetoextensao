import { jwtVerify, SignJWT } from "jose";

const secretKey = "248f12ccc00bd824603149373233d3a199c1ffffa76bb7d2b8b8826b11f3e4d6ce938c8113dbd2caf7d0ab4b9ce56909eec377be2386601fdf72048de7da828b8e60d91d3f0310bbc1874fc71f04a40db327bd3f4ceb5e2be7d48acd32fa3f33ea2ec57c059c4abf44457998b21d61d9ba88a0fd4e6566fe1ff7da011c7dbc4f799a06cb8577f344ecf44b2ff11c6b38d3db5dbc7f9d324e9179389b4cb106df2cb2299be02408f54d2d8eb98d5ce20f0c7189de5c3cecbda7b0caa1b56bfefc277c597c7de7823281e77878561f7a79ad1cd6690113fef63b46e158a0062398b3a629d8e1c89ef711e0e58079c2f03d29644c8788dd27c8034bfbb285182966";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 week")
      .sign(key);
  }
  
  export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }