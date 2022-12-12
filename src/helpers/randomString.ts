export const randomString = (n:number) => {
    return (Math.random() + 1).toString(36).substring(n);
}