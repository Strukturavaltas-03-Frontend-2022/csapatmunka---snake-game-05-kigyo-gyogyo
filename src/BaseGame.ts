import IBaseGame from "./interface/IBaseGame";
import Level from "./Level";
import Piece from "./Piece";
import Utils from "./Utils";

export default abstract class BaseGame implements IBaseGame {
    protected moving: boolean = false;

    protected paused: boolean = false;

    protected gridVisible: boolean = false;

    protected debugSpeed: number = 0;

    protected keyHeld: number = 0;

    protected noClip: boolean = false;


    protected head: Piece;
    protected tail: Piece;
    protected food: Piece | null;
    protected goldenApple: Piece | null;
    protected length: number = 0;
    protected growth: number = 0;
    protected score: number = 0;
    protected currentLevel: Level | null;
    protected garden: HTMLDivElement;

    /**
     * @returns {number}
     * Egy random számot szorozz meg a this.levels.length-szel, 
     * majd kerekítsd lefelé, ez lesz az index.
     * Majd térj vissza a this.levels tömbnek ezzel az indexével.
     */
    abstract getRandomLevel(): Level {
        return this.levels[Math.floor(Math.random() * this.levels.length)];
    };

    /**
     * @returns {boolean}
     * 1. hozz létre egy chance nevű változót 5 értékkel
     * 2. hozz létre egy pick nevű változót, értéke random szám szorozva 100-zal
     * 3. térj vissza true értékkel, ha a pick kisebb, mint a chance
     */
    abstract mayIHaveGoldenApple(): boolean {
        let chance: number = 5;
        let pick: number = Math.random() * 100;
        return pick < chance;
    };

    /**
     * @returns {void}
     * A metódus feladatai:
     * 1. keresd meg a DOM-ban az összes .vertical-grid és .horizontal-grid 
     * elemet
     * 2. mentsd el őket egy grids nevű változóba
     * 3. járd be a tömböt, és minden elemére hívd meg a Utils.removeNode 
     * metódust, hogy eltávolítsd őket az oldalról
     * 4. a this.gridVisible értékét állítsd false-ra
     */
    abstract removeGrid(): void {
        const grids = document.querySelectorAll('.vertical-grid, .horizontal-grid');
        Array.from(grids).forEach(Utils.removeNode);

        this.gridVisible = false;
    };
}
