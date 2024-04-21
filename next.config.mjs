/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/PokeAPI/**"
            },
            {
                protocol: "https",
                hostname: "assets.pokemon.com",
                port: "",
                pathname: "/assets/**"
            }
        ]
    },
};

export default nextConfig;
