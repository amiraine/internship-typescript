
interface Coordinate {
    readonly x: number
    readonly y: number
    readonly extra?: Coordinate
}

interface CoordinateContainer {
    readonly name: string
    readonly alpha: number
    readonly coordinates: ReadonlyArray<Coordinate>
}

// learn more about json.parse and json.stringify
// how to create a new deep copy of things

const coordinates: ReadonlyArray<Coordinate> = [
    {
        x: 1,
        y: 2,
    },
    {
        x: 3,
        y: 4,
    },
    {
        x: 5,
        y: 6,
    },
]

const coordinateContainer: CoordinateContainer = {
    name: "my container",
    alpha: 100,
    coordinates,
}

const coordinateCloner = (c: Coordinate) => ({...c})

const newCoordinates = coordinates
    .filter( coordinate => coordinate.x !== 3)
    .map(coordinateCloner)

const newContainer: CoordinateContainer = {
    ...coordinateContainer,
    coordinates: newCoordinates,
}