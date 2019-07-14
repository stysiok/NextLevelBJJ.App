export const getTrainingImage = (trainingName) => {
    const trainingImages = [
        {
            training: "BJJ NOWY NABÓR",
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
            training: "MMA ZAWODNICY",
            image: require('./../assets/images/mma_zawodnicy.jpg')
        },
        {
            training: "MMA ZAWODNICY / ZAPASY",
            image: require('./../assets/images/mma_zawodnicy.jpg')
        },
        {
            training: "BJJ GI FUNDAMENTY",
            image: require('./../assets/images/bjjgi.jpg')
        },
        {
            training: "BJJ GI / SPARINGI",
            image: require('./../assets/images/bjjsparingi.jpg')
        },
        {
            training: "GOOD MORNING BJJ",
            image: require('./../assets/images/goodmorning.jpg')
        },        
        {
            training: "GOOD MORNING BJJ / MMA",
            image: require('./../assets/images/goodmorning.jpg')
        },
        {
            training: "MMA NOWY NABÓR",
            image: require('./../assets/images/mma_nowy.jpg')
        },
        {
            training: "BJJ MEDIUM",
            image: require('./../assets/images/bjjmedium.jpg')
        },        
        {
            training: "SPARINGI / DRILLE",
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