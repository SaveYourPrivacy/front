import { useState } from 'react';
import '../../styles/home/termsCategorySelect.css';

function TermsCategorySelect({ onSelect }) {
    const [category, setCategory] = useState('');

    const handleSelect = (e) => {
        const value = e.target.value;
        setCategory(value);
        onSelect(value);
    };

    return (
        <div className="terms-category-radio">
            <h3>약관 종류 선택</h3>
            <div className="radio-group">
                <div className="radio-item">
                    <input type="radio" name="category" value="환불 및 해지 조항" onChange={handleSelect} />
                    <span>환불 및 해지 조항</span>
                </div>
                <div className="radio-item">
                    <input type="radio" name="category" value="자동결제 / 정기구독 조항" onChange={handleSelect} />
                    <span>자동결제 / 정기구독 조항</span>
                </div>
                <div className="radio-item">
                    <input type="radio" name="category" value="개인정보 수집 및 저장" onChange={handleSelect} />
                    <span>개인정보 수집 및 저장</span>
                </div>
                <div className="radio-item">
                    <input type="radio" name="category" value="서비스 책임 제한 / 면책 조항" onChange={handleSelect} />
                    <span>서비스 책임 제한 / 면책 조항</span>
                </div>
                <div className="radio-item">
                    <input type="radio" name="category" value="광고, 제3자 제공, 데이터 활용" onChange={handleSelect} />
                    <span>광고, 제3자 제공, 데이터 활용</span>
                </div>
            </div>
        </div>

    );
}

export default TermsCategorySelect;
