import {Animated, Easing} from 'react-native';

export const moveXBy50Animation =  (entity: any, value: any) => {
    return  Animated.timing(entity, {
    toValue: parseFloat(JSON.stringify(value)) + 50,
    duration: 500,
    useNativeDriver: false
})
};

export const moveYBy50Animation =  (entity: any, value: any) => {
    return  Animated.timing(entity, {
    toValue: parseFloat(JSON.stringify(value)) + 50,
    duration: 500,
    useNativeDriver: false
})
};

export const moveXAndYBy50Animation = (entity1: any, value1: any, entity2: any, value2: any) => {
    return Animated.parallel([
            Animated.timing(entity1, {
    toValue: parseFloat(JSON.stringify(value1)) + 50,
    duration: 500,
    useNativeDriver: false
}),
            Animated.timing(entity2, {
    toValue: parseFloat(JSON.stringify(value2)) + 50,
    duration: 500,
    useNativeDriver: false
})
        ])
};

export const sayHelloAnimationStart = (entity: any) => {
    return Animated.timing(entity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false
})
}

export const sayHelloAnimationStop = (entity: any) => {
    return Animated.timing(entity, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false
})
}

export const goToOriginAnimation = (entity1 : any, entity2: any) => {
    return Animated.parallel([
        Animated.timing(entity1, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false
}),
        Animated.timing(entity2, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false
})
    ])
};

export const rotate360DegreesAnimation = (entity: any) => {
    return Animated.timing(entity, {
    toValue: 1,
    duration: 1800,
    easing: Easing.linear,
    useNativeDriver: false
})
};

export const sayHelloFor1SecAnimationStart = (entity: any) => {
    return Animated.timing(entity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: false
})
}

export const sayHelloFor1SecAnimationStop = (entity: any) => {
    return Animated.timing(entity, {
    toValue: 0,
    duration: 1500,
    useNativeDriver: false
})
}

export const goToRandomPositionAnimation = (entity1: any, value1: any, entity2: any, value2: any) => {
    return Animated.parallel([
        Animated.timing(entity1, {
    toValue: parseFloat(JSON.stringify(value1)) + Math.random() * 100,
    duration: 500,
    useNativeDriver: false
}),
        Animated.timing(entity2, {
    toValue: parseFloat(JSON.stringify(value2)) + Math.random() * 100,
    duration: 500,
    useNativeDriver: false
})
    ])
}

export const resetAnimation = (entity1: any, entity2: any) => {
    return Animated.parallel([
        Animated.timing(entity1, {
    toValue: 200,
    duration: 500,
    useNativeDriver: false
}),
        Animated.timing(entity2, {
    toValue: 200,
    duration: 500,
    useNativeDriver: false
})
    ])
}