export const getTrainingImage = (trainingName) => {
    const trainingImages = [
        {
            training: "BJJ NO-GI NOWY NABÓR",
            image: require('./../assets/images/nogi_nowy.jpg')
        },
        {
            training: "BJJ DLA DZIECI (OD 4 LAT)",
            image: require('./../assets/images/dzieci.jpg')
        },
        {
            training: "BJJ NO-GI ZAWODNICY",
            image: require('./../assets/images/nogi_zaawansowana.jpg')
        },
        {
            training: "BJJ NOGI ZAWODNICY",
            image: require('./../assets/images/nogi_zaawansowana.jpg')
        },
        {
            training: "MMA ZAWODNICY",
            image: require('./../assets/images/mma_zawodnicy.jpg')
        },
        {
            training: "ZAPASY NOWY NABÓR",
            image: require('./../assets/images/zapasy.jpg')
        },
        {
            training: "BJJ GI DLA WSZYSTKICH",
            image: require('./../assets/images/bjjgi.jpg')
        },
        {
            training: "GOOD MORNING BJJ (GI  NOGI)",
            image: require('./../assets/images/goodmorning.jpg')
        },
        {
            training: "MMA NOWY NABÓR",
            image: require('./../assets/images/mma_nowy.jpg')
        },
        {
            training: "WOLNA MATA (DO UZGODNIENIA NA GRUPIE FB)",
            image: require('./../assets/images/wolnamata.jpg')
        },
        {
            training: "DEFAULT",
            image: require('./../assets/images/default.jpg')
        },
    ];

    let training = trainingImages.find(o => o.training === trainingName.trim());
    
    if(training == undefined){
        training = trainingImages.find(o => o.training == 'DEFAULT');
    }

    return training.image;
}