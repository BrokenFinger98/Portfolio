import { Github, ArrowRight, Calendar, Users, TrendingUp } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      id: "aicheck",
      priority: 1,
      title: "aicheck(아이췤)",
      shortDescription: "AI를 활용한 금융 사기 예방 및 자녀의 건전한 금융 습관 형성 서비스",
      description: "코어뱅킹·채널계 기반의 MSA 아키텍처로 설계된 금융 보호 서비스. Kafka 기반 비동기 알림 처리와 AI 서버 연동을 통한 실시간 사기 탐지 시스템.",
      thumbnail: "🏦",
      tech: ["Java", "Spring Boot", "Spring Cloud", "Kafka", "MySQL", "Redis", "Docker", "Jenkins", "AWS EC2"],
      teamSize: "백엔드 1명 (PL), 프론트 2명, AI 1명",
      duration: "2025.03.02 ~ 2025.04.11 (6주)",
      achievements: [
        "Kafka 기반 이벤트 처리로 응답 속도 약 40% 개선",
        "Spring Cloud 기반 MSA 아키텍처 설계 및 구현",
        "Jenkins + Docker 기반 CI/CD 파이프라인 구축",
        "FCM 기반 실시간 푸시 알림 시스템 구현"
      ],
      problems: [
        "금융 거래의 실시간 사기 탐지 요구사항",
        "AI 서버와의 비동기 통신 처리 필요",
        "마이크로서비스 간 설정 관리 복잡성"
      ],
      solutions: [
        "Kafka 기반 이벤트 드리븐 아키텍처로 비동기 처리",
        "Spring Config Server를 통한 설정 외부화 및 중앙화",
        "WebClient를 이용한 AI 서버 비동기 통신 구현"
      ],
      github: "https://github.com/BrokenFinger98/aicheck-back",
      demo: "#",
      type: "MSA"
    },
    {
      id: "ceonsun",
      priority: 2,
      title: "개과천선(개발자 과외는 천선)",
      shortDescription: "개발자와 수강생 간의 실시간 과외 매칭 플랫폼",
      description: "Redis + Kafka 기반 선착순 쿠폰 발급 시스템을 구현한 과외 매칭 플랫폼. 분산 처리 및 재고 관리를 통해 대용량 트래픽 처리 성능을 대폭 개선.",
      thumbnail: "👨‍🏫",
      tech: ["Java", "Spring Boot", "Spring Cloud", "Redis", "Kafka", "MySQL", "Docker"],
      teamSize: "백엔드 3명, 프론트 3명",
      duration: "2025.01.13 ~ 2025.02.21 (6주)",
      achievements: [
        "Redis + Kafka 기반 선착순 쿠폰 발급으로 약 3.4배 성능 향상",
        "Spring Cloud 기반 마이크로서비스 아키텍처 구현",
        "PG사 결제 연동 및 예외 처리 로직 구현",
        "Feign Client 기반 서비스 간 안정적 통신 구현"
      ],
      problems: [
        "선착순 쿠폰 발급 시 대용량 트래픽 처리 한계",
        "동시성 제어 및 재고 관리 이슈",
        "마이크로서비스 간 통신 안정성"
      ],
      solutions: [
        "Redis 분산락과 Kafka 이벤트 처리로 동시성 제어",
        "재고 관리 로직을 별도 서비스로 분리",
        "Circuit Breaker 패턴으로 장애 격리"
      ],
      github: "https://github.com/BrokenFinger98/SSAFY-ceon-sun",
      demo: "#",
      type: "대용량 데이터"
    },
    {
      id: "contract4k",
      priority: 3,
      title: "Contract4k(Contract for Kotlin)",
      shortDescription: "계약 기반 설계를 Kotlin DSL로 구현할 수 있도록 돕는 오픈소스 라이브러리",
      description: "AspectJ compile-time weaving을 활용한 AOP 기반 자동 검증 시스템. Kotlin DSL을 통해 직관적인 계약 조건 작성이 가능한 라이브러리.",
      thumbnail: "📚",
      tech: ["Kotlin", "AspectJ", "Gradle", "JitPack"],
      teamSize: "개인 프로젝트",
      duration: "2025.04.14 ~ 2025.05.22 (5주)",
      achievements: [
        "Kotlin DSL 기반 직관적인 계약 작성 인터페이스 제공",
        "AspectJ compile-time weaving 기반 런타임 자동 검증",
        "JitPack 기반 외부 의존성 배포 완료",
        "오픈소스 라이브러리로 공개 및 문서화"
      ],
      problems: [
        "Java의 복잡한 계약 기반 설계 문법",
        "런타임 검증 성능 오버헤드",
        "라이브러리 배포 및 의존성 관리"
      ],
      solutions: [
        "Kotlin DSL을 활용한 직관적 문법 설계",
        "compile-time weaving으로 런타임 성능 최적화",
        "JitPack을 통한 간편한 의존성 배포"
      ],
      github: "https://github.com/BrokenFinger98/contract4k",
      demo: "#",
      type: "오픈소스"
    },
    {
      id: "zipda",
      priority: 4,
      title: "ZIPDA(집다)",
      shortDescription: "조건 기반 필터링을 지원하는 부동산 매물 검색 플랫폼",
      description: "QueryDSL 기반 복잡 필터 조건 동적 쿼리와 Spring AI + ChatGPT API를 활용한 부동산 챗봇 기능을 제공하는 매물 검색 플랫폼.",
      thumbnail: "🏠",
      tech: ["Java", "Spring Boot", "QueryDSL", "Spring Security", "OAuth2.0", "Spring AI", "ChatGPT API", "MySQL"],
      teamSize: "백엔드 4명, 프론트 2명",
      duration: "2024.11.18 ~ 2024.11.27 (10일)",
      achievements: [
        "QueryDSL 기반 복잡 필터 조건 동적 쿼리 구현",
        "OAuth2.0 기반 소셜 로그인 및 회원가입 처리",
        "@Async 활용 이메일 인증으로 응답 속도 향상",
        "Spring AI + ChatGPT API 부동산 챗봇 구현"
      ],
      problems: [
        "복잡한 매물 검색 조건의 동적 쿼리 처리",
        "소셜 로그인 연동 및 사용자 인증 관리",
        "이메일 인증으로 인한 응답 지연"
      ],
      solutions: [
        "QueryDSL BooleanBuilder를 활용한 동적 쿼리 구성",
        "Spring AOP + OAuth2.0 기반 인증 처리 자동화",
        "비동기 처리로 이메일 발송과 응답 분리"
      ],
      github: "https://github.com/BrokenFinger98/ZIPDA",
      demo: "#",
      type: "API 개발"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "MSA": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "대용량 데이터": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "오픈소스": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "API 개발": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            핵심 프로젝트
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            실제 비즈니스 문제를 기술로 해결한 프로젝트들입니다. 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> 아키텍처 설계부터 성능 최적화</span>까지의 과정을 확인해보세요.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 프로젝트 썸네일 & 기본 정보 */}
                <div className="lg:col-span-1">
                  <div className="text-6xl mb-4 text-center">{project.thumbnail}</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(project.type)}`}>
                        {project.type}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{project.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 프로젝트 상세 정보 */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3">
                      {project.shortDescription}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* 기술 스택 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">핵심 기술 스택</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 주요 성과 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      주요 성과
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.achievements.slice(0, 4).map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                      <span>상세보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>코드 보기</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}