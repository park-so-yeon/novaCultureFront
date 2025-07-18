import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; // 전역 CSS 파일

const TERMS = [
    {
        key: 'terms1',
        label: '노바문화센터 이용약관 동의',
        required: true,
        content: '여러분을 환영합니다. 노바문화센터 서비스 및 제품(이하 “서비스”)을 이용해 주셔서 감사합니다. 본 약관은 다양한 노바문화센터 서비스의 이용과 관련하여 노바문화센터 서비스를 제공하는 노바문화센터 주식회사(이하 “노바문화센터”)와 이를 이용하는 “회원”과의 관계, 회원의 서비스 이용 절차, 권리·의무 및 책임사항 등을 규정합니다.'
    },
    {
        key: 'terms2',
        label: '개인정보 수집 및 이용 동의',
        required: true,
        content: '개인정보보호법에 따라 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 수집 및 이용목적, 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드립니다.'
    },
    {
        key: 'terms3',
        label: '프로모션 정보 수신 동의',
        required: false,
        content: '노바문화센터에서 제공하는 이벤트/혜택 등 다양한 정보를 휴대전화(앱 알림 또는 문자), 이메일로 받아보실 수 있습니다. 일부 서비스(별도 회원 체계로 운영하거나 노바문화센터 가입 이후 추가 가입하여 이용하는 서비스 등)의 경우, 별도의 동의 후 서비스 이용이 가능합니다.'
    }
];

function SignupPage() {
    // 회원가입 단계 관리: 'terms' -> 'verification' -> 'signup'
    const [currentStep, setCurrentStep] = useState('terms');

    // 약관 동의 처리
    const [checked, setChecked] = useState({ terms1: false, terms2: false, terms3: false });
    const allRequiredChecked = TERMS.filter(t => t.required).every(t => checked[t.key]);
    const allChecked = TERMS.every(t => checked[t.key]);

    const handleAllTerms = e => setChecked({ terms1: e.target.checked, terms2: e.target.checked, terms3: e.target.checked });
    const handleOneTerm = key => e => setChecked(prev => ({ ...prev, [key]: e.target.checked }));

    // 본인인증 관련 상태
    const [verificationMethod, setVerificationMethod] = useState('phone'); // 'phone' | 'email' - 라디오 버튼 선택
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [phoneSentCode, setPhoneSentCode] = useState(''); // 휴대폰 인증번호 발송 여부 확인 (실제 발송된 코드)
    const [emailSentCode, setEmailSentCode] = useState(''); // 이메일 인증번호 발송 여부 확인 (실제 발송된 코드)

    // 회원가입 폼 상태 및 아이디 중복검사
    const [form, setForm] = useState({ userId: '', password: '', passwordConfirm: '', phone: '', email: '' });
    const [idCheckResult, setIdCheckResult] = useState(null); // null | 'OK' | 'DUPLICATE' | 'ERROR'
    const [errors, setErrors] = useState({});

    // 인증 방식 변경 시 상태 초기화
    useEffect(() => {
        // 라디오 버튼 선택 변경 시 해당 인증 방식의 상태만 유지하고 다른 방식은 초기화
        if (verificationMethod === 'phone') {
            setIsEmailVerified(false);
            setEmailSentCode('');
            // 이메일 관련 에러 메시지 초기화
            setErrors(prev => ({ ...prev, email: undefined }));
        } else if (verificationMethod === 'email') {
            setIsPhoneVerified(false);
            setPhoneSentCode('');
            // 휴대폰 관련 에러 메시지 초기화
            setErrors(prev => ({ ...prev, phone: undefined }));
        }
    }, [verificationMethod]);

    // 본인인증 완료 여부에 따라 다음 단계로 전환 (회원가입 폼으로)
    useEffect(() => {
        const isCurrentMethodVerified = (verificationMethod === 'phone' && isPhoneVerified) || (verificationMethod === 'email' && isEmailVerified);
        if (isCurrentMethodVerified && currentStep === 'verification') {
            setCurrentStep('signup');
            // 인증된 정보를 form 상태에 자동 입력
            if (verificationMethod === 'phone') {
                setForm(prev => ({ ...prev, phone: prev.phone, email: '' })); // 인증된 폰번호는 유지, 이메일은 비움
            } else if (verificationMethod === 'email') {
                setForm(prev => ({ ...prev, email: prev.email, phone: '' })); // 인증된 이메일은 유지, 폰번호는 비움
            }
        }
    }, [isPhoneVerified, isEmailVerified, currentStep, verificationMethod, form.phone, form.email]);


    const handleChange = e => {
        const { name, value } = e.target;
        // 휴대폰 번호 입력 시 숫자만 허용
        if (name === 'phone') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            setForm(prev => ({ ...prev, [name]: onlyNums }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
        setErrors(prev => ({ ...prev, [name]: undefined }));
        if (name === 'userId') setIdCheckResult(null);
    };

    // 아이디 중복확인
    const checkDuplicateId = async () => {
        if (!form.userId) {
            setErrors(e => ({ ...e, userId: '아이디를 입력해주세요.' }));
            return;
        }
        try {
            // 실제 API 호출 시에는 form.userId를 서버로 전송
            const res = await axios.get(`/api/users/check-id?userId=${encodeURIComponent(form.userId)}`);
            if (res.data.available) { // 예시: { available: true }
                setIdCheckResult('OK');
            } else { // 예시: { available: false }
                setIdCheckResult('DUPLICATE');
            }
        } catch (err) {
            console.error("아이디 중복 확인 에러:", err);
            setIdCheckResult('ERROR');
        }
    };

    // 이메일 인증번호 발송
    const handleSendEmailCode = async () => {
        setErrors(prev => ({ ...prev, email: undefined }));
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
            setErrors(e => ({ ...e, email: '유효한 이메일 주소를 입력해주세요.' }));
            return;
        }
        try {
            await axios.post('/api/signup/send-email-code', { email: form.email });
            setEmailSentCode('sent');
            alert('인증번호가 발송되었습니다!');
        } catch (error) {
            setErrors(e => ({ ...e, email: '인증번호 발송 중 오류가 발생했습니다.' }));
        }
    };
    // 이메일 인증번호 확인
    const handleVerifyEmail = async () => {
        setErrors(prev => ({ ...prev, emailCode: undefined }));
        if (!form.emailCode) {
            setErrors(e => ({ ...e, emailCode: '인증번호를 입력하세요.' }));
            return;
        }
        try {
            const res = await axios.post('/api/signup/verify-email-code', { email: form.email, code: form.emailCode });
            if (res.data === true) {
                setIsEmailVerified(true);
                setErrors(prev => ({ ...prev, email: undefined, emailCode: undefined }));
                alert('이메일 인증이 완료되었습니다.');
            } else {
                setIsEmailVerified(false);
                setErrors(prev => ({ ...prev, emailCode: '인증번호가 일치하지 않거나 올바르지 않습니다.' }));
            }
        } catch (error) {
            setIsEmailVerified(false);
            setErrors(prev => ({ ...prev, emailCode: '인증번호 확인 중 오류가 발생했습니다.' }));
        }
    };
    // 휴대폰 인증번호 발송
    const handleSendPhoneCode = async () => {
        setErrors(prev => ({ ...prev, phone: undefined }));
        if (!form.phone || !/^\d{10,11}$/.test(form.phone)) {
            setErrors(e => ({ ...e, phone: '유효한 휴대폰 번호(10-11자리 숫자)를 입력해주세요.' }));
            return;
        }
        try {
            await axios.post('/api/signup/send-phone-code', { phone: form.phone });
            setPhoneSentCode('sent');
            alert('인증번호가 발송되었습니다!');
        } catch (error) {
            setErrors(e => ({ ...e, phone: '인증번호 발송 중 오류가 발생했습니다.' }));
        }
    };
    // 휴대폰 인증번호 확인
    const handleVerifyPhone = async () => {
        setErrors(prev => ({ ...prev, phoneCode: undefined }));
        if (!form.phoneCode) {
            setErrors(e => ({ ...e, phoneCode: '인증번호를 입력하세요.' }));
            return;
        }
        try {
            const res = await axios.post('/api/signup/verify-phone-code', { phone: form.phone, code: form.phoneCode });
            if (res.data === true) {
                setIsPhoneVerified(true);
                setErrors(prev => ({ ...prev, phone: undefined, phoneCode: undefined }));
                alert('휴대폰 인증이 완료되었습니다.');
            } else {
                setIsPhoneVerified(false);
                setErrors(prev => ({ ...prev, phoneCode: '인증번호가 일치하지 않거나 올바르지 않습니다.' }));
            }
        } catch (error) {
            setIsPhoneVerified(false);
            setErrors(prev => ({ ...prev, phoneCode: '인증번호 확인 중 오류가 발생했습니다.' }));
        }
    };

    // 최종 회원가입 폼 필수값 검증
    const validateSignupForm = () => {
        const newErrors = {};
        if (!form.userId) newErrors.userId = '아이디를 입력하세요.';
        if (idCheckResult !== 'OK') newErrors.userId = '아이디 중복확인을 해주세요.';
        if (!form.password) newErrors.password = '비밀번호를 입력하세요.';
        if (!form.passwordConfirm) newErrors.passwordConfirm = '비밀번호 확인을 입력하세요.';
        if (form.password !== form.passwordConfirm) newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';

        // 본인인증 여부 최종 확인
        const isCurrentMethodVerified = (verificationMethod === 'phone' && isPhoneVerified) || (verificationMethod === 'email' && isEmailVerified);
        if (!isCurrentMethodVerified) {
             newErrors.general = '본인인증이 완료되지 않았습니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 회원가입
    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        if (!validateSignupForm()) {
            alert('필수 입력 정보를 확인해주세요.');
            return;
        }
        try {
            const res = await axios.post('/api/signup', {
                userId: form.userId,
                password: form.password,
                phone: form.phone,
                email: form.email
            });
            if (res.data === true) {
                alert('회원가입이 완료되었습니다!');
                // TODO: 회원가입 성공 후 페이지 이동 등 추가
            } else {
                setErrors(prev => ({ ...prev, general: '회원가입 실패' }));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, general: '회원가입 중 오류가 발생했습니다.' }));
        }
    };

    return (
        <div className="page-container auth-page">
            <h2>회원가입</h2>

            {currentStep === 'terms' && (
                <div className="terms-box">
                    <div className="terms-content">
                        <label className="terms-all-label">
                            <input type="checkbox" checked={allChecked} onChange={handleAllTerms} />
                            <span className="terms-all-text"><b>노바문화센터 이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신(선택)에 모두 동의합니다.</b></span>
                        </label>
                        <div className="terms-list">
                            {TERMS.map(term => (
                                <div className="terms-item" key={term.key}>
                                    <label className="terms-item-label">
                                        <input type="checkbox" checked={checked[term.key]} onChange={handleOneTerm(term.key)} />
                                        <span className="terms-item-title">{term.label} {term.required ? <span className="terms-required">(필수)</span> : <span className="terms-optional">(선택)</span>}</span>
                                    </label>
                                    <div className="terms-scrollbox">{term.content}</div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="terms-next-btn"
                            onClick={() => setCurrentStep('verification')}
                            disabled={!allRequiredChecked}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

            {currentStep === 'verification' && (
                <div className="verification-section">
                    <h3>본인인증</h3>
                    <p>회원가입을 위해 휴대폰 또는 이메일 중 한 가지 방법으로 본인인증을 진행해주세요.</p>

                    <div className="verification-method-selector">
                        <label>
                            <input
                                type="radio"
                                name="verificationMethod"
                                value="phone"
                                checked={verificationMethod === 'phone'}
                                onChange={() => setVerificationMethod('phone')}
                            /> 휴대폰 인증
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="verificationMethod"
                                value="email"
                                checked={verificationMethod === 'email'}
                                onChange={() => setVerificationMethod('email')}
                            /> 이메일 인증
                        </label>
                    </div>

                    {/* 휴대폰 인증 섹션 */}
                    {verificationMethod === 'phone' && (
                        <div className="verification-method-box">
                            <h4>휴대폰 인증</h4>
                            <div className="form-group"> {/* form-group 클래스 추가 */}
                                <label htmlFor="phone" className="form-label">휴대폰 번호</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="'-' 없이 숫자만 입력"
                                        className={`form-control ${errors.phone ? 'error' : ''}`}
                                        value={form.phone}
                                        onChange={handleChange}
                                        maxLength="11"
                                        disabled={isPhoneVerified}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendPhoneCode}
                                        disabled={isPhoneVerified || phoneSentCode === 'sent'}
                                    >
                                        인증번호 발송
                                    </button>
                                </div>
                                {errors.phone && <p className="error-msg">{errors.phone}</p>}
                            </div>
                            {phoneSentCode === 'sent' && !isPhoneVerified && (
                                <div className="form-group"> {/* form-group 클래스 추가 */}
                                    <label htmlFor="phoneCode" className="form-label">인증번호</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input
                                            type="text"
                                            id="phoneCode"
                                            name="phoneCode" // name 속성 추가
                                            placeholder="인증번호 6자리 입력"
                                            className={`form-control ${errors.phoneCode ? 'error' : ''}`}
                                            value={form.phoneCode || ''} // form.phoneCode 사용, 초기값 '' 설정
                                            onChange={handleChange} // handleChange 사용
                                            maxLength="6"
                                            disabled={isPhoneVerified}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleVerifyPhone}
                                            disabled={isPhoneVerified}
                                        >
                                            인증 확인
                                        </button>
                                    </div>
                                    {errors.phoneCode && <p className="error-msg">{errors.phoneCode}</p>}
                                </div>
                            )}
                            {isPhoneVerified && <p className="green-text">인증이 완료되었습니다!</p>}
                        </div>
                    )}

                    {/* 이메일 인증 섹션 */}
                    {verificationMethod === 'email' && (
                        <div className="verification-method-box">
                            <h4>이메일 인증</h4>
                            <div className="form-group"> {/* form-group 클래스 추가 */}
                                <label htmlFor="email" className="form-label">이메일 주소</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="예: example@email.com"
                                        className={`form-control ${errors.email ? 'error' : ''}`}
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={isEmailVerified}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendEmailCode}
                                        disabled={isEmailVerified || emailSentCode === 'sent'}
                                    >
                                        인증번호 발송
                                    </button>
                                </div>
                                {errors.email && <p className="error-msg">{errors.email}</p>}
                            </div>
                            {emailSentCode === 'sent' && !isEmailVerified && (
                                <div className="form-group"> {/* form-group 클래스 추가 */}
                                    <label htmlFor="emailCode" className="form-label">인증번호</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input
                                            type="text"
                                            id="emailCode"
                                            name="emailCode" // name 속성 추가
                                            placeholder="인증번호 6자리 입력"
                                            className={`form-control ${errors.emailCode ? 'error' : ''}`}
                                            value={form.emailCode || ''} // form.emailCode 사용, 초기값 '' 설정
                                            onChange={handleChange} // handleChange 사용
                                            maxLength="6"
                                            disabled={isEmailVerified}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleVerifyEmail}
                                            disabled={isEmailVerified}
                                        >
                                            인증 확인
                                        </button>
                                    </div>
                                    {errors.emailCode && <p className="error-msg">{errors.emailCode}</p>}
                                </div>
                            )}
                            {isEmailVerified && <p className="green-text">인증이 완료되었습니다!</p>}
                        </div>
                    )}

                    <button
                        className="verification-complete-btn" // 클래스명 변경 (더 적절하게)
                        onClick={() => { /* 이 버튼은 useEffect에 의해 자동으로 다음 단계로 넘어감 */ }}
                        disabled={!(verificationMethod === 'phone' && isPhoneVerified) && !(verificationMethod === 'email' && isEmailVerified)}
                        style={{ marginTop: '20px' }}
                    >
                        본인인증 완료
                    </button>
                    {!((verificationMethod === 'phone' && isPhoneVerified) || (verificationMethod === 'email' && isEmailVerified)) && 
                        <div className="error-msg" style={{ marginTop: 8 }}>
                            선택된 인증 방식(휴대폰 또는 이메일)을 완료해야 다음 단계로 진행할 수 있습니다.
                        </div>
                    }
                </div>
            )}

            {currentStep === 'signup' && (
                <form className="auth-form" onSubmit={handleSubmitSignup}>
                    <h3>회원 정보 입력</h3>
                    <div className="form-group"> {/* form-group 클래스 추가 */}
                        <label htmlFor="userId" className="form-label">아이디</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                placeholder="아이디"
                                className={`form-control ${errors.userId ? 'error' : ''}`}
                                value={form.userId}
                                onChange={handleChange}
                            />
                            <button type="button" onClick={checkDuplicateId}>중복확인</button>
                        </div>
                        {idCheckResult === 'OK' && <p className="green-text">사용가능</p>}
                        {idCheckResult === 'DUPLICATE' && <p className="error-msg">중복된 아이디입니다.</p>}
                        {idCheckResult === 'ERROR' && <p className="error-msg">아이디 중복 확인 중 오류가 발생했습니다.</p>}
                        {errors.userId && <p className="error-msg">{errors.userId}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            className={`form-control ${errors.password ? 'error' : ''}`}
                            value={form.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-msg">{errors.password}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirm" className="form-label">비밀번호 확인</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="비밀번호 확인"
                            className={`form-control ${errors.passwordConfirm ? 'error' : ''}`}
                            value={form.passwordConfirm}
                            onChange={handleChange}
                        />
                        {errors.passwordConfirm && <p className="error-msg">{errors.passwordConfirm}</p>}
                    </div>

                    {/* 본인인증으로 자동 입력되는 필드 */}
                    {(verificationMethod === 'phone' || form.phone) && ( // 전화번호 필드를 항상 보여주되, disabled로 처리
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">휴대폰 번호</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                className="form-control"
                                readOnly // 읽기 전용
                                disabled // 비활성화
                            />
                            {isPhoneVerified && <p className="green-text">휴대폰 본인인증 완료 (자동 입력)</p>}
                        </div>
                    )}

                    {(verificationMethod === 'email' || form.email) && ( // 이메일 필드를 항상 보여주되, disabled로 처리
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                className="form-control"
                                readOnly // 읽기 전용
                                disabled // 비활성화
                            />
                            {isEmailVerified && <p className="green-text">이메일 본인인증 완료 (자동 입력)</p>}
                        </div>
                    )}
                    
                    {errors.general && <div className="error-msg">{errors.general}</div>}

                    <button type="submit">회원가입</button>
                </form>
            )}
        </div>
    );
}

export default SignupPage;