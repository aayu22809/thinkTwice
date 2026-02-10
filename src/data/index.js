import { scenarios as en } from './scenarios_en';
import { scenarios as zh } from './scenarios_zh';
import { scenarios as hi } from './scenarios_hi';
import { scenarios as ja } from './scenarios_ja';
import { scenarios as ko } from './scenarios_ko';

export const getScenarios = (lang) => {
    switch (lang) {
        case 'zh': return zh;
        case 'hi': return hi;
        case 'ja': return ja;
        case 'ko': return ko;
        case 'en':
        default:
            return en;
    }
};
