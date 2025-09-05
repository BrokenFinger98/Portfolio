import { Database, Server, Users, Zap } from "lucide-react";

export default function AboutSection() {
  const developmentPhilosophy = {
    title: "개발 철학",
    description: "확장 가능하고 유지보수하기 쉬운 코드",
    details: "단순한 기능 구현을 위한 코드가 아니라, 유지보수하기 좋은 코드에 대해 끊임없이 고민하며, 미래의 변화에 유연하게 대응할 수 있는 아키텍처를 설계합니다."
  };

  const coreStrengths = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "MSA 아키텍처 설계",
      description: "마이크로서비스 패턴을 활용한 확장 가능한 시스템 구축",
      achievement: "Spring Cloud를 활용한 MSA"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "대용량 트래픽 정복",
      description: "동시 접속 1만명도 문제없이! Redis와 Kafka로 트래픽 폭증 상황을 안정적으로 처리",
      achievement: "쿠폰 발급 성능 3.4배 급상승"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI와 함께하는 스마트 개발",
      description: "Claude Code로 실시간 코딩부터 ChatGPT API까지, AI를 개발 파트너로 활용",
      achievement: "생산성 극대화 + 코드 퀄리티 Up"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "소통의 달인",
      description: "Jira로 이슈 추적, Notion으로 지식 공유, Confluence로 문서화까지 완벽 정리",
      achievement: "팀워크 만점! 프로젝트 성공률 Up"
    }
  ];


  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 개발 철학 섹션 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose Me?
          </h2>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              &quot;{developmentPhilosophy.description}&quot;
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {developmentPhilosophy.details}
            </p>
          </div>
        </div>

        {/* 핵심 강점 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
            핵심 강점
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreStrengths.map((strength, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                  {strength.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {strength.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                  {strength.description}
                </p>
                <div className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {strength.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}