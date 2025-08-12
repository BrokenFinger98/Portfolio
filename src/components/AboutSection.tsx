import { Code, Database, Server, Zap, Target, Users, BookOpen } from "lucide-react";

export default function AboutSection() {
  const developmentPhilosophy = {
    title: "개발 철학",
    description: "확장 가능하고 유지보수하기 쉬운 코드",
    details: "복잡한 비즈니스 요구사항을 단순하고 명확한 코드로 해결하며, 미래의 변화에 유연하게 대응할 수 있는 아키텍처를 설계합니다."
  };

  const coreStrengths = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "MSA 아키텍처 설계",
      description: "마이크로서비스 패턴을 활용한 확장 가능한 시스템 구축",
      achievement: "10개+ 서비스 운영 경험"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "성능 최적화",
      description: "캐싱, DB 튜닝을 통한 시스템 성능 개선",
      achievement: "응답시간 70% 단축"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "대용량 데이터 처리",
      description: "Kafka, Spring Batch를 활용한 실시간 데이터 파이프라인",
      achievement: "일 100만건+ 처리"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "클린 아키텍처",
      description: "테스트 가능하고 유지보수 용이한 코드 설계",
      achievement: "코드 커버리지 90%+"
    }
  ];

  const differentiators = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "문제 해결 중심 사고",
      description: "비즈니스 문제를 기술적 솔루션으로 전환하는 능력",
      example: "레거시 시스템을 무중단으로 MSA로 전환"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "협업 및 커뮤니케이션",
      description: "개발팀, 기획팀과의 원활한 소통으로 프로젝트 성공 이끔",
      example: "크로스 펑셔널 팀에서 기술 리드 역할 수행"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "지속적 학습 및 개선",
      description: "새로운 기술을 빠르게 학습하고 실무에 적용",
      example: "Kotlin 도입으로 개발 생산성 30% 향상"
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
              "{developmentPhilosophy.description}"
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

        {/* 차별화 포인트 */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-750 dark:to-gray-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            차별화 포인트
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <div className="text-blue-600 dark:text-blue-400">
                      {item.icon}
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                  {item.description}
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    💡 {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}