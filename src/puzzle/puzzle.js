var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));

var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};


const react_1 = __importStar(require("react"));
const clamp = (value, min, max) => {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
};

const solveTolerancePercentage = 0.028;

export const JigsawPuzzle = ({imageSrc, rows = 3, columns = 4, onSolved = () => { } }) => {
    const [tiles, setTiles] = (0, react_1.useState)(); 
    //useState as a way to create states inside of function instead of creating classes
    const [imageSize, setImageSize] = (0, react_1.useState)();
    const [rootSize, setRootSize] = (0, react_1.useState)();
    const [calculatedHeight, setCalculatedHeight] = (0, react_1.useState)();
    const rootElement = (0, react_1.useRef)();
    const resizeObserver = (0, react_1.useRef)();
    const draggingTile = (0, react_1.useRef)();
    const onImageLoaded = (0, react_1.useCallback)((image) => {
        setImageSize({ width: image.width, height: image.height });
        if (rootSize) {
            setCalculatedHeight(rootSize.width / image.width * image.height);
        }
        setTiles(Array.from(Array(rows * columns).keys())
            .map(position => ({
            correctPosition: position,
            tileHeight: image.height / rows,
            tileWidth: image.width / columns,
            tileOffsetX: (position % columns) * (image.width / columns),
            tileOffsetY: Math.floor(position / columns) * (image.height / rows),
            currentPosXPerc: Math.random() * (1 - 1 / rows),
            currentPosYPerc: Math.random() * (1 - 1 / columns),
            solved: false
        })));
    }, [rows, columns]);
    const onRootElementResized = (0, react_1.useCallback)((args) => {
        const contentRect = args.find(it => it.contentRect)?.contentRect;
        if (contentRect) {
            setRootSize({
                width: contentRect.width,
                height: contentRect.height
            });
            if (imageSize) {
                setCalculatedHeight(contentRect.width / imageSize.width * imageSize.height);
            }
        }
    }, [setRootSize, imageSize]);
    const onRootElementRendered = (0, react_1.useCallback)((element) => {
        if (element) {
            rootElement.current = element;
            const observer = new ResizeObserver(onRootElementResized);
            observer.observe(element);
            resizeObserver.current = observer;
            setRootSize({
                width: element.offsetWidth,
                height: element.offsetHeight
            });
            if (imageSize) {
                setCalculatedHeight(element.offsetWidth / imageSize.width * imageSize.height);
            }
        }
    }, [setRootSize, imageSize, rootElement, resizeObserver]);
    (0, react_1.useEffect)(() => {
        const image = new Image();
        image.onload = () => onImageLoaded(image);
        image.src = imageSrc;
    }, [imageSrc, rows, columns]);
    const onTileMouseDown = (0, react_1.useCallback)((tile, event) => {
        if (!tile.solved) {
            if (event.type === 'touchstart') {
                document.documentElement.style.setProperty('overflow', 'hidden');
            }
            const eventPos = {
                x: event.pageX ?? event.touches[0].pageX,
                y: event.pageY ?? event.touches[0].pageY
            };
            draggingTile.current = {
                tile,
                elem: event.target,
                mouseOffsetX: eventPos.x - event.target.getBoundingClientRect().x,
                mouseOffsetY: eventPos.y - event.target.getBoundingClientRect().y
            };
            event.target.classList.add('jigsaw-puzzle__piece--dragging');
        }
    }, [draggingTile]);
    const onRootMouseMove = (0, react_1.useCallback)((event) => {
        if (draggingTile.current) {
            event.stopPropagation();
            event.preventDefault();
            const eventPos = {
                x: event.pageX ?? event.touches[0].pageX,
                y: event.pageY ?? event.touches[0].pageY
            };
            const draggedToRelativeToRoot = {
                x: clamp(eventPos.x - rootElement.current.getBoundingClientRect().left - draggingTile.current.mouseOffsetX, 0, rootSize.width - draggingTile.current.elem.offsetWidth),
                y: clamp(eventPos.y - rootElement.current.getBoundingClientRect().top - draggingTile.current.mouseOffsetY, 0, rootSize.height - draggingTile.current.elem.offsetHeight)
            };
            draggingTile.current.elem.style.setProperty('left', `${draggedToRelativeToRoot.x}px`);
            draggingTile.current.elem.style.setProperty('top', `${draggedToRelativeToRoot.y}px`);
        }
    }, [draggingTile, rootSize]);
    const onRootMouseUp = (0, react_1.useCallback)((event) => {
        if (draggingTile.current) {
            if (event.type === 'touchend') {
                document.documentElement.style.removeProperty('overflow');
            }
            draggingTile.current?.elem.classList.remove('jigsaw-puzzle__piece--dragging');
            const draggedToPercentage = {
                x: clamp(draggingTile.current.elem.offsetLeft / rootSize.width, 0, 1),
                y: clamp(draggingTile.current.elem.offsetTop / rootSize.height, 0, 1)
            };
            const draggedTile = draggingTile.current.tile;
            const targetPositionPercentage = {
                x: draggedTile.correctPosition % columns / columns,
                y: Math.floor(draggedTile.correctPosition / columns) / rows
            };
            const isSolved = Math.abs(targetPositionPercentage.x - draggedToPercentage.x) <= solveTolerancePercentage &&
                Math.abs(targetPositionPercentage.y - draggedToPercentage.y) <= solveTolerancePercentage;
            setTiles(prevState => {
                const newState = [
                    ...prevState.filter(it => it.correctPosition !== draggedTile.correctPosition),
                    {
                        ...draggedTile,
                        currentPosXPerc: !isSolved ? draggedToPercentage.x : targetPositionPercentage.x,
                        currentPosYPerc: !isSolved ? draggedToPercentage.y : targetPositionPercentage.y,
                        solved: isSolved
                    }
                ];
                if (newState.every(tile => tile.solved)) {
                    onSolved();
                }
                return newState;
            });
            draggingTile.current = undefined;
        }
    }, [draggingTile, setTiles, rootSize, onSolved]);
    return <div ref={onRootElementRendered} onTouchMove={onRootMouseMove} onMouseMove={onRootMouseMove} onTouchEnd={onRootMouseUp} onMouseUp={onRootMouseUp} onTouchCancel={onRootMouseUp} onMouseLeave={onRootMouseUp} className="jigsaw-puzzle" style={{ height: !calculatedHeight ? undefined : `${calculatedHeight}px` }} onDragEnter={event => {
            event.stopPropagation();
            event.preventDefault();
        }} onDragOver={event => {
            event.stopPropagation();
            event.preventDefault();
        }}>
    {tiles && rootSize && imageSize && tiles.map(tile => <div draggable={false} onMouseDown={event => onTileMouseDown(tile, event)} onTouchStart={event => onTileMouseDown(tile, event)} key={tile.correctPosition} className={`jigsaw-puzzle__piece ${tile.solved ? ' jigsaw-puzzle__piece--solved' : ''} `} style={{
                position: 'absolute',
                height: `${1 / rows * 100}%`,
                width: `${1 / columns * 100}%`,
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: `${rootSize.width}px ${rootSize.height}px`,
                backgroundPositionX: `${tile.correctPosition % columns / (columns - 1) * 100}%`,
                backgroundPositionY: `${Math.floor(tile.correctPosition / columns) / (rows - 1) * 100}%`,
                left: `${tile.currentPosXPerc * rootSize.width}px`,
                top: `${tile.currentPosYPerc * rootSize.height}px`
            }}/>)}
  </div>;
};



