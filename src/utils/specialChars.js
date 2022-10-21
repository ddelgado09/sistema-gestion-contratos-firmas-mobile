export const replaceSpecialChars = (string) => {
    const regex = /áéíóúÁÉÍÓU/;
    return string.replace(regex, '');
}