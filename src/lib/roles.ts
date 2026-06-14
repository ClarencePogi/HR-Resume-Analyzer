export const getRoles = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/roles`);

        const data = await response.json();

        return data.roles;
    } catch (error) {
        console.log(error);
    }
}