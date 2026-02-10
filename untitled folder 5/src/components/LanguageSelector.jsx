import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <select
            value={language}
            onChange={handleChange}
            className="language-selector"
            style={{
                padding: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ddd',
                marginRight: '1rem',
                cursor: 'pointer',
                fontFamily: 'inherit'
            }}
        >
            <option value="en">English (EN)</option>
            <option value="zh">中文 (ZH)</option>
            <option value="hi">हिन्दी (HI)</option>
            <option value="ja">日本語 (JA)</option>
            <option value="ko">한국어 (KO)</option>
        </select>
    );
};

export default LanguageSelector;
