import { ArrowRight, Calendar, Users, TrendingUp } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      id: "memento",
      title: "MEMENTO",
      shortDescription: "싸피생을 위한 추억 아카이빙 웹 서비스",
      description: "개인 PC를 직접 서버로 구축하고 Minio 오브젝트 스토리지를 활용한 미디어 관리 시스템. TDD 기반 개발과 Spring REST DOCS를 통한 API 문서 자동화를 구현한 협업 프로젝트.",
      thumbnail: "/images/projects/memento/logo.png",
      tech: ["Java", "Spring Boot", "Spring Data JPA", "Spring Security", "MySQL", "Minio", "JUnit5", "Spring REST DOCS", "TDD"],
      teamSize: "백엔드 3명",
      duration: "2025.07.29 ~ ",
      achievements: [
        "개인 PC를 Linux 서버로 직접 구축 및 운영",
        "Minio 오브젝트 스토리지로 미디어 파일 관리 시스템 구현",
        "Spring REST DOCS로 테스트 기반 API 문서 자동화"
      ],
      github: "https://github.com/BrokenFinger98/memento",
    },
    {
      id: "contract4k",
      title: "Contract4k(Contract for Kotlin)",
      shortDescription: "계약에 의한 설계를 Kotlin DSL로 구현할 수 있도록 돕는 오픈소스 라이브러리",
      description: "AspectJ compile-time weaving을 활용한 AOP 기반 자동 검증 시스템. Kotlin DSL을 통해 직관적인 계약 조건 작성이 가능한 라이브러리.",
      thumbnail: "/images/projects/contract4k/logo.png",
      tech: ["Kotlin", "AspectJ", "Gradle", "JitPack"],
      teamSize: "백엔드 4명",
      duration: "2025.04.14 ~ 2025.05.22 (5주)",
      achievements: [
        "Kotlin DSL 기반 직관적인 계약 작성 인터페이스 제공",
        "AspectJ compile-time weaving 기반 런타임 자동 검증",
        "JitPack 기반 외부 의존성 배포 완료",
        "오픈소스 라이브러리로 공개 및 문서화"
      ],
      github: "https://github.com/BrokenFinger98/contract4k",
    },
    {
      id: "aicheck",
      title: "aicheck(아이췤)",
      shortDescription: "온디바이스 AI를 활용한 금융 사기 예방 및 자녀의 건전한 금융 습관 형성 서비스",
      description: "코어뱅킹·채널계 기반의 MSA 아키텍처로 설계된 금융 보호 서비스. Kafka 기반 비동기 알림 처리와 AI 서버 연동을 통한 실시간 사기 탐지 시스템.",
      thumbnail: "/images/projects/aicheck/logo.png",
      tech: ["Java", "Spring Boot", "Spring Cloud", "Kafka", "Redis", "MySQL", "MongoDB", "Docker", "Jenkins", "AWS EC2", "AWS S3", "Nginx", "React", "Next.js", "TypeScript", "Zustand"],
      teamSize: "백엔드 2명 (PL), 프론트 2명, AI 2명",
      duration: "2025.03.02 ~ 2025.04.11 (6주)",
      achievements: [
        "Redis 세션을 이용하여 대화 컨텍스트를 보존한 AI 챗봇 구현",
        "Spring Cloud 기반 MSA 아키텍처 설계 및 구현",
        "Jenkins + Docker 기반 CI/CD 파이프라인 구축",
        "FCM 기반 실시간 푸시 알림 시스템 구현"
      ],
      github: "https://github.com/BrokenFinger98/aicheck-back",
    },
    {
      id: "ceonsun",
      title: "개과천선(개발자 과외는 천선)",
      shortDescription: "개발자와 수강생 간의 실시간 과외 매칭 플랫폼",
      description: "Redis + Kafka 기반 선착순 쿠폰 발급 시스템을 구현한 과외 매칭 플랫폼. 분산 처리 및 재고 관리를 통해 대용량 트래픽 처리 성능을 대폭 개선.",
      thumbnail: "/images/projects/ceonsun/logo.png",
      tech: ["Java", "Spring Boot", "Spring Cloud", "WebSocket", "Kafka", "Redis", "MySQL", "MongoDB", "Docker", "Jenkins", "AWS EC2", "AWS S3", "React"],
      teamSize: "백엔드 4명, 프론트 1명",
      duration: "2025.01.13 ~ 2025.02.21 (6주)",
      achievements: [
        "Redis + Kafka 기반 선착순 쿠폰 발급으로 약 3.4배 성능 향상",
        "Spring Cloud 기반 마이크로서비스 아키텍처 구현",
        "PG사 결제 연동 및 예외 처리 로직 구현",
        "Feign Client 기반 서비스 간 안정적 통신 구현"
      ],
      github: "https://github.com/BrokenFinger98/SSAFY-ceon-sun",
    },
    {
      id: "zipda",
      title: "ZIPDA(집다)",
      shortDescription: "조건 기반 필터링을 지원하는 부동산 매물 검색 플랫폼",
      description: "QueryDSL 기반 복잡 필터 조건 동적 쿼리와 Spring AI + ChatGPT API를 활용한 부동산 챗봇 기능을 제공하는 매물 검색 플랫폼.",
      thumbnail: "/images/projects/zipda/logo.png",
      tech: ["Java", "Spring Boot", "QueryDSL", "Spring Security", "OAuth2.0", "Spring AI", "ChatGPT API", "MySQL"],
      teamSize: "백엔드 1명, 프론트 1명",
      duration: "2024.11.18 ~ 2024.11.27 (10일)",
      achievements: [
        "QueryDSL 기반 복잡 필터 조건 동적 쿼리 구현",
        "OAuth2.0 기반 소셜 로그인 및 회원가입 처리",
        "@Async 활용 이메일 인증으로 응답 속도 향상",
        "Spring AI + ChatGPT API 부동산 챗봇 구현"
      ],
      github: "https://github.com/BrokenFinger98/ZIPDA",
    }
  ];


  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            프로젝트
          </h2>
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
                  <div className="w-40 h-40 mb-8 mx-auto relative">
                  {project.thumbnail.startsWith('/') ? (
                    <img 
                      src={project.thumbnail} 
                      alt={`${project.title} 로고`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-6xl text-center">{project.thumbnail}</div>
                  )}
                </div>
                  <div className="space-y-3">
                    
                    <div className="space-y-3 text-base text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Users className="w-7 h-7" />
                        <span>{project.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-7 h-7" />
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
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
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
