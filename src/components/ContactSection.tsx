import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "이메일",
      value: "dbtjsdn980818@naver.com",
      href: "mailto:dbtjsdn980818@naver.com"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "github.com/BrokenFinger98",
      href: "https://github.com/BrokenFinger98"
    },
    {
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
        <path d="M4.857 2C3.832 2 3 2.832 3 3.857v24.286C3 29.168 3.832 30 4.857 30h22.286C28.168 30 29 29.168 29 28.143V3.857C29 2.832 28.168 2 27.143 2H4.857z" fill="#20c997"/>
        <path d="M8.5 8.5h15v2h-15zm0 4h15v2h-15zm0 4h15v2h-15zm0 4h10v2h-10z" fill="white"/>
        <path d="M12.5 14.5l8 4-8 4v-8z" fill="white"/>
      </svg>,
      label: "기술 블로그",
      value: "velog.io/@brokenfinger",
      href: "https://velog.io/@brokenfinger/posts"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/BrokenFinger98",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
        <path d="M4.857 2C3.832 2 3 2.832 3 3.857v24.286C3 29.168 3.832 30 4.857 30h22.286C28.168 30 29 29.168 29 28.143V3.857C29 2.832 28.168 2 27.143 2H4.857z" fill="#20c997"/>
        <path d="M8.5 8.5h15v2h-15zm0 4h15v2h-15zm0 4h15v2h-15zm0 4h10v2h-10z" fill="white"/>
        <path d="M12.5 14.5l8 4-8 4v-8z" fill="white"/>
      </svg>,
      label: "Velog",
      href: "https://velog.io/@brokenfinger/posts",
      color: "hover:text-green-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            연락하기
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            백엔드 개발 협업이나 기술적 논의에 대해 언제든지 연락 주세요.<br />
            <span className="text-blue-600 dark:text-blue-400 font-medium">지속적인 학습과 지식 공유</span>를 통해 함께 성장하고 싶습니다.
          </p>
        </div>

        {/* 연락처 정보 */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center p-8 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {info.icon}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {info.label}
                </p>
                <p className="text-gray-900 dark:text-white font-medium text-center">
                  {info.value}
                </p>
              </a>
            ))}
          </div>

          {/* 연락 안내 */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📬 연락 방법
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong>이메일</strong>로 연락주시면 <span className="text-blue-600 dark:text-blue-400 font-semibold">24시간 이내</span> 답변드리겠습니다.<br />
              기술적 궁금한 점이나 협업 제안은 언제든 환영입니다! 🚀
            </p>
            <div className="mt-6">
              <a
                href="mailto:dbtjsdn980818@naver.com?subject=포트폴리오 문의&body=안녕하세요, 포트폴리오를 보고 연락드립니다."
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                지금 이메일 보내기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}