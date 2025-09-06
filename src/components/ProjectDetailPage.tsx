"use client";

import { useState } from "react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Users, 
  Target, 
  Zap, 
  Code, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Server,
  Settings
} from "lucide-react";

interface ProjectDetailPageProps {
  projectId: string;
}

interface KeyFeature {
  title: string;
  description: string[];
}

interface ImageItem {
  title?: string;
  src: string;
  alt?: string;
}

interface TechItem {
  name: string;
  icon: string;
  reason?: string;
  version?: string;
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const [activeSection, setActiveSection] = useState("overview");

  const renderKeyFeatures = (overview: Record<string, unknown>) => {
    if (!('keyFeatures' in overview) || !overview.keyFeatures || !Array.isArray(overview.keyFeatures) || overview.keyFeatures.length === 0) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          주요 기능
        </h3>
        <div className="space-y-5">
          {(overview.keyFeatures as KeyFeature[]).map((feature: KeyFeature, index: number) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <ul className="list-none space-y-2 ml-4">
                {feature.description.map((desc: string, descIndex: number) => (
                  <li key={descIndex} className="text-gray-600 dark:text-gray-300 text-base flex items-start">
                    <span className="text-gray-400 mr-3">•</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVideoPortfolio = (project: Record<string, unknown>) => {
    if (!('videoPortfolio' in project) || !project.videoPortfolio) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎬 영상 포트폴리오
        </h3>
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={convertToEmbedUrl(project.videoPortfolio as string)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="프로젝트 영상 포트폴리오"
          />
        </div>
      </div>
    );
  };

  const renderDemoVideo = (project: Record<string, unknown>) => {
    if (!('demoVideo' in project) || !project.demoVideo) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎥 시연 영상
        </h3>
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={convertToEmbedUrl(project.demoVideo as string)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="프로젝트 시연 영상"
          />
        </div>
      </div>
    );
  };

  // YouTube URL을 임베드 URL로 변환하는 함수
  const convertToEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube URL 패턴들 처리
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // 이미 embed URL인 경우 그대로 반환
    return url;
  };

  // 프로젝트 데이터 (실제로는 API나 데이터베이스에서 가져올 수 있음)
  const projectsData = {
    aicheck: {
      title: "aicheck(아이췤)",
      subtitle: "AI를 활용한 금융 사기 예방 및 자녀의 건전한 금융 습관 형성 서비스",
      thumbnail: "/images/projects/aicheck/logo.png",
      duration: "2025.03.02 ~ 2025.04.11 (6주)",
      team: "백엔드 1명 (PL), 프론트 2명, AI 1명",
      role: "Back-End, Infra, PL",
      github: "https://github.com/BrokenFinger98/aicheck-back",
      demo: "#",
      overview: {
        background: "급증하는 금융 사기와 자녀의 잘못된 금융 습관 형성에 대한 사회적 우려가 높아지는 상황에서, AI 기술을 활용해 실시간으로 사기를 탐지하고 건전한 금융 습관을 형성할 수 있는 서비스의 필요성이 대두되었습니다.",
        objectives: [
          "AI 기반 실시간 금융 사기 탐지 시스템 구축",
          "코어뱅킹·채널계 기반의 안정적인 MSA 아키텍처 설계",
          "실시간 알림과 사용자 경험을 위한 성능 최적화",
          "확장 가능하고 유지보수 용이한 금융 플랫폼 개발"
        ],
      },
      architecture: {
        systemDiagram: `
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Web Client    │    │   Admin Panel   │
│   (Flutter)     │    │    (React)      │    │    (React)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                         ┌─────────────────┐
                         │  Nginx + SSL    │
                         │  Load Balancer  │
                         └─────────────────┘
                                  │
                         ┌─────────────────┐
                         │ Spring Gateway  │
                         │   API Gateway   │
                         └─────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                        │                         │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Service  │    │Account Service  │    │  AI Service     │
│   (인증/인가)     │    │   (계좌관리)     │    │  (사기탐지)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                         │
        └────────────────────────┼─────────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Config Server   │
                    │  (설정 중앙화)   │
                    └─────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                       │                        │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     MySQL       │    │     Redis       │    │     Kafka       │
│  (주요 데이터)    │    │    (캐시)       │    │  (이벤트 처리)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
`,
        keyComponents: [
          {
            name: "API Gateway",
            description: "Spring Cloud Gateway를 통한 라우팅, 인증, 로드밸런싱",
            tech: "Spring Cloud Gateway"
          },
          {
            name: "User Service",
            description: "JWT 기반 인증/인가, 사용자 관리",
            tech: "Spring Security, JWT"
          },
          {
            name: "Account Service", 
            description: "코어뱅킹 계좌 관리, 거래 내역 처리",
            tech: "Spring Boot, JPA"
          },
          {
            name: "AI Service",
            description: "머신러닝 기반 사기 패턴 탐지 및 분석",
            tech: "Python, TensorFlow"
          },
          {
            name: "Config Server",
            description: "마이크로서비스 설정 중앙화 및 환경 분리",
            tech: "Spring Cloud Config"
          }
        ],
        database: {
          schema: `
사용자 관리:
- users (사용자 기본정보)
- user_profiles (프로필 상세정보)
- authentication_logs (인증 로그)

계좌 관리:
- accounts (계좌 정보)
- transactions (거래 내역)  
- transaction_categories (거래 카테고리)

AI 탐지:
- fraud_patterns (사기 패턴 정의)
- fraud_detections (탐지 결과)
- ml_models (ML 모델 메타데이터)

알림:
- notifications (알림 내역)
- notification_settings (알림 설정)
`,
          design: "정규화된 관계형 DB 설계로 데이터 무결성 확보, 인덱스 최적화를 통한 조회 성능 향상"
        }
      },
      challenges: [
        {
          problem: "금융 거래의 실시간 사기 탐지 성능 이슈",
          situation: "AI 서버와의 동기 통신으로 인해 거래 승인 시간이 2-3초까지 지연되어 사용자 경험이 저하되고 있었습니다.",
          solution: "Kafka를 활용한 이벤트 드리븐 아키텍처 도입",
          implementation: [
            "거래 요청을 즉시 승인 후 Kafka로 비동기 전송",
            "AI 서버에서 사기 탐지 완료 시 결과를 이벤트로 발행",
            "사기 의심 거래 발견 시 실시간 알림 및 계좌 잠금 처리"
          ],
          result: "거래 승인 시간을 평균 2.3초에서 0.6초로 단축 (약 40% 개선)"
        },
        {
          problem: "마이크로서비스 간 설정 관리의 복잡성",
          situation: "각 서비스별로 개별 설정 파일을 관리하여 환경별 배포 시 설정 불일치와 관리 오버헤드가 발생했습니다.",
          solution: "Spring Cloud Config Server 도입",
          implementation: [
            "Git 기반 중앙화된 설정 저장소 구성",
            "환경별 프로파일 분리 (dev, staging, prod)",
            "설정 변경 시 서비스 재시작 없이 동적 리로드"
          ],
          result: "설정 관리 시간 80% 단축, 환경별 배포 오류 제로화"
        },
        {
          problem: "AI 서버와의 통신 안정성 확보",
          situation: "AI 서버의 일시적 장애나 응답 지연으로 인한 전체 서비스 영향 최소화 필요",
          solution: "Circuit Breaker 패턴과 WebClient 비동기 통신",
          implementation: [
            "Hystrix Circuit Breaker로 AI 서비스 호출 감시",
            "WebClient를 통한 논블로킹 비동기 통신",
            "Fallback 메커니즘으로 AI 서버 장애 시 기본 정책 적용"
          ],
          result: "AI 서버 장애 시에도 99.9% 서비스 가용성 유지"
        }
      ],
      techStack: {
        backend: [
          { name: "Java 17", reason: "안정성과 성능이 검증된 LTS 버전" },
          { name: "Spring Boot 3.x", reason: "빠른 개발과 운영 편의성" },
          { name: "Spring Cloud Gateway", reason: "마이크로서비스 라우팅 및 보안" },
          { name: "Spring Security", reason: "JWT 기반 인증/인가" },
          { name: "Spring Data JPA", reason: "ORM을 통한 생산적 데이터 액세스" }
        ],
        infrastructure: [
          { name: "Docker", reason: "컨테이너 기반 일관된 배포 환경" },
          { name: "Jenkins", reason: "CI/CD 파이프라인 자동화" },
          { name: "Nginx", reason: "로드밸런싱과 SSL 터미네이션" },
          { name: "AWS EC2", reason: "안정적인 클라우드 인프라" }
        ],
        messaging: [
          { name: "Apache Kafka", reason: "대용량 실시간 이벤트 스트리밍" },
          { name: "Redis", reason: "세션 관리 및 캐싱" },
          { name: "MySQL", reason: "ACID 트랜잭션이 중요한 금융 데이터" }
        ]
      },
      codeExamples: [
        {
          title: "Kafka 이벤트 드리븐 사기 탐지",
          language: "java",
          code: `@Service
@RequiredArgsConstructor
public class FraudDetectionService {
    
    private final KafkaTemplate<String, TransactionEvent> kafkaTemplate;
    private final WebClient aiServiceWebClient;
    
    @Transactional
    public TransactionResponse processTransaction(TransactionRequest request) {
        // 1. 즉시 거래 승인 (사용자 대기시간 최소화)
        Transaction transaction = transactionRepository.save(
            Transaction.builder()
                .amount(request.getAmount())
                .status(TransactionStatus.APPROVED)
                .build()
        );
        
        // 2. 비동기로 AI 사기 탐지 이벤트 발행
        TransactionEvent event = TransactionEvent.builder()
            .transactionId(transaction.getId())
            .userId(request.getUserId())
            .amount(request.getAmount())
            .timestamp(LocalDateTime.now())
            .build();
            
        kafkaTemplate.send("fraud-detection-topic", event);
        
        return TransactionResponse.approved(transaction.getId());
    }
    
    @KafkaListener(topics = "fraud-detection-topic")
    public void detectFraud(TransactionEvent event) {
        // WebClient로 AI 서버와 비동기 통신
        aiServiceWebClient.post()
            .uri("/detect-fraud")
            .bodyValue(event)
            .retrieve()
            .bodyToMono(FraudDetectionResult.class)
            .subscribe(this::handleFraudResult);
    }
    
    private void handleFraudResult(FraudDetectionResult result) {
        if (result.isFraudulent()) {
            // 사기 거래 탐지 시 계좌 잠금 및 알림
            accountService.lockAccount(result.getUserId());
            notificationService.sendFraudAlert(result);
        }
    }
}`
        },
        {
          title: "Circuit Breaker 패턴 적용",
          language: "java", 
          code: `@Component
public class AIServiceClient {
    
    private final WebClient webClient;
    private final CircuitBreaker circuitBreaker;
    
    public AIServiceClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://ai-service").build();
        this.circuitBreaker = CircuitBreaker.ofDefaults("ai-service");
    }
    
    public Mono<FraudDetectionResult> detectFraud(TransactionEvent event) {
        return circuitBreaker.executeSupplier(() -> 
            webClient.post()
                .uri("/detect-fraud")
                .bodyValue(event)
                .retrieve()
                .bodyToMono(FraudDetectionResult.class)
                .timeout(Duration.ofSeconds(3))
        ).onErrorReturn(getDefaultFraudResult()); // Fallback 처리
    }
    
    private FraudDetectionResult getDefaultFraudResult() {
        return FraudDetectionResult.builder()
            .fraudulent(false)
            .reason("AI 서비스 일시 불가, 기본 정책 적용")
            .build();
    }
}`
        }
      ],
      testing: {
        strategy: "테스트 피라미드 기반 계층별 테스트 전략 수립",
        coverage: "90%+",
        types: [
          {
            type: "단위 테스트",
            tool: "JUnit5 + Mockito",
            description: "비즈니스 로직의 핵심 기능 테스트"
          },
          {
            type: "통합 테스트", 
            tool: "@SpringBootTest",
            description: "서비스 간 연동과 데이터베이스 통합 테스트"
          },
          {
            type: "성능 테스트",
            tool: "K6",
            description: "거래 처리 성능 및 동시성 테스트"
          }
        ]
      },
      achievements: [
        {
          metric: "응답 시간 개선",
          before: "2.3초",
          after: "0.6초", 
          improvement: "40% 개선",
          description: "Kafka 기반 비동기 처리 도입"
        },
        {
          metric: "시스템 가용성",
          before: "95%",
          after: "99.9%",
          improvement: "4.9% 향상",
          description: "Circuit Breaker와 Fallback 메커니즘"
        },
        {
          metric: "배포 시간",
          before: "60분",
          after: "12분",
          improvement: "80% 단축",
          description: "Jenkins CI/CD 파이프라인 자동화"
        },
        {
          metric: "설정 관리",
          before: "수동 관리",
          after: "중앙화 자동화",
          improvement: "100% 자동화",
          description: "Spring Config Server 도입"
        }
      ],
      lessons: [
        {
          category: "기술적 성장",
          points: [
            "MSA 환경에서 서비스 간 통신 최적화 경험",
            "Kafka를 활용한 이벤트 드리븐 아키텍처 설계 역량",
            "금융 도메인의 복잡한 비즈니스 로직 구현 경험"
          ]
        },
        {
          category: "프로젝트 관리", 
          points: [
            "팀 리더로서 기술적 의사결정과 일정 관리 경험",
            "CI/CD 파이프라인 구축을 통한 개발 생산성 향상",
            "코드 리뷰와 문서화를 통한 팀 지식 공유 문화 구축"
          ]
        }
      ],
      improvements: [
        "서비스 메시 도입을 통한 더 정교한 트래픽 관리",
        "분산 트레이싱 시스템 도입으로 MSA 모니터링 강화", 
        "CQRS 패턴 적용을 통한 읽기/쓰기 성능 최적화",
        "Kubernetes 기반 오케스트레이션으로 운영 자동화"
      ],
      images: {
        gallery: [
          {
            src: "/images/projects/aicheck/architecture.png",
            alt: "MSA 아키텍처 다이어그램",
            title: "마이크로서비스 아키텍처"
          },
          {
            src: "/images/projects/aicheck/ec2.png", 
            alt: "AWS EC2 인스턴스 구성",
            title: "클라우드 인프라"
          },
          {
            src: "/images/projects/aicheck/s3.png",
            alt: "AWS S3 버킷 구성", 
            title: "파일 저장소"
          },
          {
            src: "/images/projects/aicheck/보이스피싱.gif",
            alt: "보이스피싱 탐지 데모",
            title: "AI 보이스피싱 탐지"
          },
          {
            src: "/images/projects/aicheck/스미싱.gif",
            alt: "스미싱 탐지 데모", 
            title: "AI 스미싱 탐지"
          },
          {
            src: "/images/projects/aicheck/용돈기입장.gif",
            alt: "용돈 기입장 기능",
            title: "용돈 관리 기능"
          }
        ],
        erd: [
          {
            src: "/images/projects/aicheck/erd_bank.png",
            alt: "은행 관련 ERD",
            title: "은행 시스템 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_ai.png", 
            alt: "AI 관련 ERD",
            title: "AI 시스템 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_business.png",
            alt: "비즈니스 로직 ERD",
            title: "비즈니스 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_notification.png",
            alt: "알림 시스템 ERD", 
            title: "알림 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_record.png",
            alt: "거래 기록 ERD",
            title: "거래 기록 ERD"
          }
        ]
      }
    },
    ceonsun: {
      title: "개과천선(개발자 과외는 천선)",
      subtitle: "개발자와 수강생 간의 실시간 과외 매칭 플랫폼",
      thumbnail: "/images/projects/ceonsun/logo.png",
      duration: "2025.01.13 ~ 2025.02.21 (6주)",
      team: "백엔드 3명, 프론트 3명",
      role: "Back-End",
      github: "https://github.com/BrokenFinger98/SSAFY-ceon-sun",
      demo: "#",
      overview: {
        background: "코로나19 이후 온라인 교육 수요가 급증하면서, 개발자와 수강생을 연결하는 전문화된 플랫폼의 필요성이 높아졌습니다. 특히 개발 분야는 실무 경험이 중요한 영역으로, 현업 개발자로부터 직접 배울 수 있는 과외 서비스의 수요가 증가했습니다.",
        objectives: [
          "개발자-수강생 실시간 매칭 시스템 구축",
          "대용량 트래픽 처리 가능한 쿠폰 발급 시스템 개발",
          "안정적인 결제 시스템과 정산 기능 구현",
          "MSA 기반 확장 가능한 플랫폼 아키텍처 설계"
        ],
      },
      architecture: {
        systemDiagram: `
┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   Mobile App    │
│    (React)      │    │   (Flutter)     │
└─────────────────┘    └─────────────────┘
         │                        │
         └────────────────────────┼────────────────────────┐
                                  │                         │
                         ┌─────────────────┐               │
                         │ Spring Gateway  │               │
                         │   + Eureka      │               │
                         └─────────────────┘               │
                                  │                         │
        ┌─────────────────────────┼─────────────────────────┘
        │                        │                         
        │                        │                        
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Service  │    │ Tutoring Service│    │ Coupon Service  │
│     (인증)       │    │   (과외매칭)     │    │  (쿠폰발급)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                         │
        │                        │                         │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│Payment Service  │    │ Config Server   │    │Discovery Service│
│   (결제처리)     │    │   (설정관리)     │    │   (서비스등록)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                         │
        └────────────────────────┼─────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                       │                        │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     MySQL       │    │     Redis       │    │     Kafka       │
│  (주요 데이터)    │    │ (분산락/캐시)    │    │ (이벤트 처리)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
`,
        keyComponents: [
          {
            name: "Gateway Service",
            description: "Eureka 서비스 디스커버리와 라우팅 관리",
            tech: "Spring Cloud Gateway, Eureka"
          },
          {
            name: "User Service",
            description: "사용자 인증/인가, 프로필 관리",
            tech: "Spring Security, JWT, OAuth2"
          },
          {
            name: "Tutoring Service", 
            description: "과외 요청, 매칭, 스케줄 관리",
            tech: "Spring Boot, JPA, QueryDSL"
          },
          {
            name: "Coupon Service",
            description: "대용량 트래픽 처리 선착순 쿠폰 발급",
            tech: "Redis, Kafka, Spring Boot"
          },
          {
            name: "Payment Service",
            description: "PG사 연동 결제 처리 및 정산",
            tech: "Spring Boot, 토스페이먼츠 API"
          }
        ]
      },
      challenges: [
        {
          problem: "선착순 쿠폰 발급 시 대용량 트래픽 처리 성능 한계",
          situation: "인기 강의의 할인 쿠폰 발급 시 동시 접속자 1만명+ 상황에서 기존 DB 기반 처리로는 응답 지연과 데드락이 빈발했습니다.",
          solution: "Redis 분산락 + Kafka 이벤트 처리 조합",
          implementation: [
            "Redis SETNX를 활용한 분산락으로 동시성 제어",
            "쿠폰 재고를 Redis에서 원자적 연산으로 관리",
            "발급 성공 시 Kafka로 비동기 DB 저장",
            "사용자에게는 즉시 응답, 실제 쿠폰 정보는 비동기 처리"
          ],
          result: "처리 성능 3.4배 향상 (300 TPS → 1,020 TPS), 응답시간 95% 단축"
        },
        {
          problem: "마이크로서비스 간 데이터 일관성 보장",
          situation: "결제 완료 후 과외 예약 상태 업데이트, 쿠폰 사용 처리 등 여러 서비스 간 트랜잭션 처리 필요",
          solution: "Saga 패턴과 보상 트랜잭션 구현",
          implementation: [
            "Choreography 방식의 이벤트 기반 Saga 패턴 적용",
            "각 단계별 보상 트랜잭션 정의",
            "실패 시 자동 롤백 및 알림 처리"
          ],
          result: "분산 트랜잭션 성공률 99.7% 달성, 데이터 불일치 제로화"
        }
      ],
      techStack: {
        backend: [
          { name: "Java 11", reason: "팀 전체의 숙련도와 안정성 고려" },
          { name: "Spring Boot", reason: "빠른 개발과 MSA 적합성" },
          { name: "Spring Cloud", reason: "마이크로서비스 생태계 지원" },
          { name: "Spring Data JPA", reason: "객체지향적 데이터 액세스" },
          { name: "QueryDSL", reason: "타입 안전한 동적 쿼리 작성" }
        ],
        messaging: [
          { name: "Apache Kafka", reason: "고성능 이벤트 스트리밍" },
          { name: "Redis", reason: "분산락과 고속 캐싱" },
          { name: "MySQL", reason: "ACID 특성이 필요한 비즈니스 데이터" }
        ]
      },
      codeExamples: [
        {
          title: "Redis 분산락 기반 선착순 쿠폰 발급",
          language: "java",
          code: `@Service
@RequiredArgsConstructor
public class CouponService {
    
    private final RedisTemplate<String, String> redisTemplate;
    private final KafkaTemplate<String, CouponEvent> kafkaTemplate;
    private final CouponRepository couponRepository;
    
    private static final String COUPON_LOCK_KEY = "coupon:lock:";
    private static final String COUPON_COUNT_KEY = "coupon:count:";
    private static final int LOCK_TIMEOUT = 10; // seconds
    
    public CouponIssueResult issueCoupon(Long couponId, Long userId) {
        String lockKey = COUPON_LOCK_KEY + couponId;
        String countKey = COUPON_COUNT_KEY + couponId;
        
        // Redis 분산락 획득 시도
        Boolean lockAcquired = redisTemplate.opsForValue()
            .setIfAbsent(lockKey, String.valueOf(userId), 
                        Duration.ofSeconds(LOCK_TIMEOUT));
        
        if (!lockAcquired) {
            return CouponIssueResult.failure("쿠폰 발급 처리 중입니다.");
        }
        
        try {
            // 원자적 연산으로 재고 확인 및 차감
            Long remainingCount = redisTemplate.opsForValue()
                .decrement(countKey);
                
            if (remainingCount < 0) {
                // 재고 복원
                redisTemplate.opsForValue().increment(countKey);
                return CouponIssueResult.failure("쿠폰이 모두 소진되었습니다.");
            }
            
            // 쿠폰 발급 성공 - 비동기로 DB 저장
            CouponEvent event = CouponEvent.builder()
                .couponId(couponId)
                .userId(userId)
                .issuedAt(LocalDateTime.now())
                .build();
                
            kafkaTemplate.send("coupon-issued-topic", event);
            
            return CouponIssueResult.success("쿠폰이 발급되었습니다.");
            
        } finally {
            // 락 해제
            redisTemplate.delete(lockKey);
        }
    }
    
    @KafkaListener(topics = "coupon-issued-topic")
    @Transactional
    public void saveCouponToDatabase(CouponEvent event) {
        // 비동기로 실제 쿠폰 엔티티 저장
        UserCoupon userCoupon = UserCoupon.builder()
            .couponId(event.getCouponId())
            .userId(event.getUserId())
            .status(CouponStatus.ACTIVE)
            .issuedAt(event.getIssuedAt())
            .build();
            
        couponRepository.save(userCoupon);
        
        // 사용자에게 쿠폰 발급 완료 알림
        notificationService.sendCouponIssuedNotification(event.getUserId());
    }
}`
        }
      ],
      achievements: [
        {
          metric: "쿠폰 발급 성능",
          before: "300 TPS",
          after: "1,020 TPS",
          improvement: "3.4배 향상",
          description: "Redis 분산락 + Kafka 비동기 처리"
        },
        {
          metric: "응답 시간",
          before: "2.5초", 
          after: "120ms",
          improvement: "95% 단축",
          description: "메모리 기반 처리와 비동기 아키텍처"
        },
        {
          metric: "동시 처리 사용자",
          before: "500명",
          after: "10,000명+",
          improvement: "20배 증가",
          description: "분산 시스템 아키텍처 적용"
        }
      ],
      lessons: [
        {
          category: "성능 최적화",
          points: [
            "대용량 트래픽 상황에서의 분산락 활용법 습득",
            "Redis와 Kafka를 조합한 고성능 이벤트 처리 경험",
            "동시성 제어와 성능 최적화의 트레이드오프 이해"
          ]
        }
      ],
      images: {
        gallery: [
          {
            src: "/images/projects/ceonsun/architecture.png",
            alt: "마이크로서비스 아키텍처",
            title: "시스템 아키텍처"
          },
          {
            src: "/images/projects/ceonsun/main.png",
            alt: "메인 페이지",
            title: "메인 화면"
          },
          {
            src: "/images/projects/ceonsun/login.png",
            alt: "로그인 페이지",
            title: "사용자 로그인"
          },
          {
            src: "/images/projects/ceonsun/class.png",
            alt: "과외 수업 화면", 
            title: "과외 수업"
          },
          {
            src: "/images/projects/ceonsun/chatting.png",
            alt: "채팅 화면",
            title: "실시간 채팅"
          },
          {
            src: "/images/projects/ceonsun/payment.png",
            alt: "결제 화면",
            title: "결제 시스템"
          },
          {
            src: "/images/projects/ceonsun/notification.png", 
            alt: "알림 화면",
            title: "알림 기능"
          },
          {
            src: "/images/projects/ceonsun/rank.png",
            alt: "강사 랭킹",
            title: "강사 랭킹 시스템"
          }
        ],
        erd: [
          {
            src: "/images/projects/ceonsun/erd.png",
            alt: "데이터베이스 ERD", 
            title: "데이터베이스 설계"
          }
        ]
      }
    },
    contract4k: {
      title: "Contract4k(Contract for Kotlin)",
      subtitle: "계약 기반 설계를 Kotlin DSL로 구현할 수 있도록 돕는 오픈소스 라이브러리",
      thumbnail: "📚",
      duration: "2025.04.14 ~ 2025.05.22 (5주)",
      team: "개인 프로젝트",
      role: "개발자",
      github: "https://github.com/BrokenFinger98/contract4k",
      demo: "#",
      overview: {
        background: "Java의 기존 계약 기반 설계(Contract-based Design) 도구들은 문법이 복잡하고 가독성이 떨어져 개발자들이 사용하기 어려웠습니다. Kotlin의 DSL(Domain Specific Language) 특성을 활용하여 더 직관적이고 사용하기 쉬운 계약 라이브러리를 만들고자 했습니다.",
        objectives: [
          "Kotlin DSL 기반 직관적인 계약 작성 인터페이스 제공",
          "컴파일 타임 위빙으로 런타임 성능 최적화",
          "JitPack을 통한 간편한 의존성 배포",
          "오픈소스 생태계에 기여"
        ],
      },
      codeExamples: [
        {
          title: "Kotlin DSL 계약 정의",
          language: "kotlin",
          code: `@Contract
class BankAccount(private var balance: Double) {
    
    @PreCondition("amount > 0")
    @PostCondition("balance == old(balance) + amount")
    fun deposit(amount: Double) {
        require(amount > 0) { "입금액은 양수여야 합니다" }
        balance += amount
    }
    
    @PreCondition("amount > 0 && amount <= balance")
    @PostCondition("balance == old(balance) - amount")
    fun withdraw(amount: Double): Boolean {
        return if (amount > 0 && amount <= balance) {
            balance -= amount
            true
        } else {
            false
        }
    }
    
    @Invariant("balance >= 0")
    fun getBalance(): Double = balance
}`
        },
        {
          title: "AspectJ 기반 자동 검증",
          language: "kotlin",
          code: `@Aspect
class ContractEnforcementAspect {
    
    @Around("@annotation(contract)")
    fun enforceContract(joinPoint: ProceedingJoinPoint, contract: Contract): Any? {
        val method = (joinPoint.signature as MethodSignature).method
        val target = joinPoint.target
        val args = joinPoint.args
        
        // Pre-condition 검증
        method.annotations.filterIsInstance<PreCondition>()
            .forEach { preCondition ->
                val result = evaluateCondition(preCondition.value, target, args)
                if (!result) {
                    throw ContractViolationException(
                        "Pre-condition violated: \${preCondition.value}"
                    )
                }
            }
        
        // 원본 메서드 실행
        val oldState = captureState(target)
        val result = joinPoint.proceed()
        
        // Post-condition 검증
        method.annotations.filterIsInstance<PostCondition>()
            .forEach { postCondition ->
                val conditionResult = evaluateCondition(
                    postCondition.value, target, args, oldState, result
                )
                if (!conditionResult) {
                    throw ContractViolationException(
                        "Post-condition violated: \${postCondition.value}"
                    )
                }
            }
        
        return result
    }
}`
        }
      ],
      achievements: [
        {
          metric: "오픈소스 공개",
          before: "개인 사용",
          after: "JitPack 배포",
          improvement: "100% 공개",
          description: "GitHub + JitPack 기반 의존성 배포"
        },
        {
          metric: "런타임 성능",
          before: "리플렉션 기반",
          after: "컴파일 타임",
          improvement: "90% 개선",
          description: "AspectJ compile-time weaving 적용"
        }
      ],
      lessons: [
        {
          category: "라이브러리 설계",
          points: [
            "Kotlin DSL 설계와 구현 방법 학습",
            "AspectJ를 활용한 AOP 프로그래밍 경험",
            "오픈소스 라이브러리 배포 및 관리 프로세스 이해"
          ]
        }
      ]
    },
    memento: {
      title: "MEMENTO",
      subtitle: "TDD와 개인 PC 서버 운영을 통한 추억 공유 플랫폼",
      thumbnail: "💭",
      duration: "2025.07.29 ~ 2025.09.05 (5주)",
      team: "백엔드 3명",
      role: "Back-End, DevOps",
      github: "https://github.com/BrokenFinger98/memento",
      demo: "#",
      overview: {
        background: "클라우드 서비스 비용 부담과 개발 과정에서의 테스트 중요성, 그리고 팀 협업 시 API 문서 관리의 어려움을 해결하고자 했습니다. 개인 PC를 직접 서버로 운영하며 인프라 비용을 절약하고, TDD와 문서 자동화를 통해 개발 품질을 높이는 것이 목표였습니다.",
        objectives: [
          "개인 PC 기반 Linux 서버 구축 및 운영 경험 습득",
          "Minio 오브젝트 스토리지를 활용한 미디어 파일 관리 시스템",
          "TDD 방법론 도입으로 안정적인 소프트웨어 개발",
          "Spring REST DOCS를 통한 API 문서 자동화"
        ],
      },
      challenges: [
        {
          problem: "클라우드 비용 절약을 위한 개인 서버 운영",
          situation: "AWS나 GCP 같은 클라우드 서비스 비용이 부담스러워 개인 PC를 직접 서버로 활용해야 했지만, 안정적인 운영과 외부 접근 설정에 대한 경험이 부족했습니다.",
          solution: "개인 PC Linux 서버 구축과 포트 포워딩 설정",
          implementation: [
            "Ubuntu Server 설치 및 네트워크 설정",
            "공유기 포트 포워딩으로 외부 접근 허용",
            "방화벽 및 보안 설정으로 안전한 서버 운영",
            "Docker Compose를 활용한 서비스 컨테이너화"
          ],
          result: "월 클라우드 비용 100% 절약 및 서버 운영 실무 경험 획득"
        },
        {
          problem: "대용량 미디어 파일의 효율적 저장과 관리",
          situation: "음성, 이미지 등 다양한 미디어 파일을 저장해야 했지만, 파일 시스템 기반 저장은 확장성과 관리 측면에서 한계가 있었습니다.",
          solution: "Minio 오브젝트 스토리지 도입",
          implementation: [
            "Minio 서버 구축 및 S3 호환 API 설정",
            "버킷 정책을 통한 파일 접근 권한 관리",
            "Spring Boot와 Minio Client 연동 구현",
            "미디어 파일 업로드/다운로드 API 개발"
          ],
          result: "확장 가능한 오브젝트 스토리지 구축 및 S3 호환성 확보"
        },
        {
          problem: "협업 시 API 문서 동기화와 테스트 커버리지 확보",
          situation: "팀 개발 과정에서 API 명세 변경 시 문서 업데이트가 지연되고, 수동 테스트로 인한 버그 발생 위험이 높았습니다.",
          solution: "TDD 도입과 Spring REST DOCS 기반 문서 자동화",
          implementation: [
            "JUnit5와 MockMvc를 활용한 API 테스트 작성",
            "Given-When-Then 패턴의 체계적인 테스트 코드",
            "Spring REST DOCS로 테스트 기반 문서 자동 생성",
            "Gradle 빌드 시 문서 자동 배포 설정"
          ],
          result: "90% 이상 테스트 커버리지 달성 및 항상 최신 상태의 API 문서 제공"
        }
      ],
      techStack: {
        backend: [
          { name: "Java 17", reason: "최신 LTS 버전으로 안정성과 성능 보장" },
          { name: "Spring Boot", reason: "빠른 개발과 운영 효율성" },
          { name: "Spring Data JPA", reason: "객체 지향적 데이터 액세스 계층" },
          { name: "Spring Security", reason: "사용자 인증과 권한 관리" }
        ],
        storage: [
          { name: "Minio", reason: "S3 호환 오브젝트 스토리지로 미디어 파일 관리" },
          { name: "MySQL", reason: "관계형 데이터의 일관성과 ACID 트랜잭션" }
        ],
        testing: [
          { name: "JUnit5", reason: "TDD 방법론의 핵심 테스트 프레임워크" },
          { name: "Spring REST DOCS", reason: "테스트 기반 API 문서 자동 생성" },
          { name: "MockMvc", reason: "Spring MVC 컨트롤러 통합 테스트" }
        ],
        infrastructure: [
          { name: "Ubuntu Server", reason: "개인 PC 기반 Linux 서버 환경" },
          { name: "Docker", reason: "컨테이너 기반 서비스 배포" },
          { name: "Docker Compose", reason: "멀티 컨테이너 애플리케이션 관리" }
        ]
      },
      codeExamples: [
        {
          title: "Minio 오브젝트 스토리지 서비스",
          language: "java",
          code: `@Service
@RequiredArgsConstructor
public class MinioStorageService {
    
    private final MinioClient minioClient;
    
    @Value("\${minio.bucket.name}")
    private String bucketName;
    
    public String uploadFile(MultipartFile file, String fileName) throws Exception {
        // 버킷 존재 확인 및 생성
        ensureBucketExists();
        
        // 파일 업로드
        minioClient.putObject(
            PutObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .stream(file.getInputStream(), file.getSize(), -1)
                .contentType(file.getContentType())
                .build()
        );
        
        // 퍼블릭 URL 반환
        return minioClient.getPresignedObjectUrl(
            GetPresignedObjectUrlArgs.builder()
                .method(Method.GET)
                .bucket(bucketName)
                .object(fileName)
                .expiry(60 * 60 * 24) // 24시간 유효
                .build()
        );
    }
    
    private void ensureBucketExists() throws Exception {
        boolean bucketExists = minioClient.bucketExists(
            BucketExistsArgs.builder().bucket(bucketName).build());
        
        if (!bucketExists) {
            minioClient.makeBucket(
                MakeBucketArgs.builder().bucket(bucketName).build());
                
            // 퍼블릭 읽기 정책 설정
            String policy = """
                {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Principal": "*",
                            "Action": "s3:GetObject",
                            "Resource": "arn:aws:s3:::%s/*"
                        }
                    ]
                }""".formatted(bucketName);
                
            minioClient.setBucketPolicy(
                SetBucketPolicyArgs.builder()
                    .bucket(bucketName)
                    .config(policy)
                    .build()
            );
        }
    }
}`
        },
        {
          title: "TDD 기반 API 테스트 with Spring REST DOCS",
          language: "java",
          code: `@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(MemoryController.class)
class MemoryControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private MemoryService memoryService;
    
    @Test
    @DisplayName("추억 생성 API 테스트")
    void createMemory_Success() throws Exception {
        // Given
        MemoryCreateRequest request = MemoryCreateRequest.builder()
            .title("소중한 추억")
            .content("가족과 함께한 여행")
            .build();
            
        MemoryResponse response = MemoryResponse.builder()
            .id(1L)
            .title(request.getTitle())
            .content(request.getContent())
            .createdAt(LocalDateTime.now())
            .build();
            
        given(memoryService.createMemory(any(), any()))
            .willReturn(response);
        
        // When & Then
        mockMvc.perform(post("/api/memories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value(request.getTitle()))
            .andExpect(jsonPath("$.content").value(request.getContent()))
            .andDo(document("memory-create",
                requestFields(
                    fieldWithPath("title").description("추억 제목"),
                    fieldWithPath("content").description("추억 내용")
                ),
                responseFields(
                    fieldWithPath("id").description("추억 ID"),
                    fieldWithPath("title").description("추억 제목"),
                    fieldWithPath("content").description("추억 내용"),
                    fieldWithPath("createdAt").description("생성 일시")
                )
            ));
    }
}`
        }
      ],
      achievements: [
        {
          metric: "인프라 비용",
          before: "클라우드 월 $50+",
          after: "개인 서버 $0",
          improvement: "100% 절약",
          description: "개인 PC Linux 서버 구축 및 운영"
        },
        {
          metric: "파일 스토리지",
          before: "파일 시스템",
          after: "Minio 오브젝트 스토리지",
          improvement: "S3 호환성 확보",
          description: "확장 가능한 오브젝트 스토리지 구축"
        },
        {
          metric: "테스트 커버리지",
          before: "수동 테스트",
          after: "TDD 90%+",
          improvement: "자동화 달성",
          description: "JUnit5 기반 체계적 테스트 도입"
        },
        {
          metric: "API 문서화",
          before: "수동 관리",
          after: "자동 생성",
          improvement: "동기화 100%",
          description: "Spring REST DOCS 기반 테스트 연동 문서"
        }
      ],
      lessons: [
        {
          category: "DevOps & 인프라",
          points: [
            "개인 PC Ubuntu Server 구축 및 네트워크 설정 경험",
            "Docker Compose를 활용한 멀티 컨테이너 서비스 운영",
            "포트 포워딩과 방화벽 설정을 통한 안전한 서버 운영",
            "Minio 오브젝트 스토리지 구축 및 S3 호환 API 활용"
          ]
        },
        {
          category: "TDD & 테스트",
          points: [
            "Given-When-Then 패턴의 체계적인 테스트 작성법",
            "Spring REST DOCS를 활용한 테스트 기반 문서 자동화",
            "MockMvc와 JUnit5를 통한 API 통합 테스트 경험",
            "테스트 커버리지 90% 이상 달성을 통한 코드 품질 향상"
          ]
        },
        {
          category: "협업 & 문서화",
          points: [
            "API 문서 자동화로 팀 간 커뮤니케이션 효율성 증대",
            "테스트 코드와 문서의 동기화를 통한 신뢰성 확보",
            "Git Flow와 코드 리뷰를 통한 체계적 협업 프로세스"
          ]
        }
      ],
      improvements: [
        "Kubernetes 클러스터 구축으로 컨테이너 오케스트레이션 자동화",
        "Jenkins Pipeline을 통한 CI/CD 자동화 고도화",
        "Prometheus + Grafana 모니터링 시스템 구축",
        "Load Balancer 도입으로 고가용성 서버 아키텍처 구현"
      ]
    },
    zipda: {
      title: "ZIPDA(집다)",
      subtitle: "조건 기반 필터링을 지원하는 부동산 매물 검색 플랫폼",
      thumbnail: "/images/projects/zipda/logo.png",
      duration: "2024.11.18 ~ 2024.11.27 (10일)",
      team: "백엔드 1명, 프론트 1명",
      role: "Back-End",
      github: "https://github.com/BrokenFinger98/ZIPDA",
      demo: "#",
      demoVideo: "https://www.youtube.com/watch?v=gwj6t58paY0",
      overview: {
        background: "SSAFY에서 재공해준 부동산 데이터를 활용하여 진행한 프로젝트입니다. 기존 부동산 플랫폼에서 차별화를 준 서비스를 만들고 싶었습니다. AI 기술을 활용한 챗봇과 정교한 필터링 시스템을 통해 더 나은 부동산 검색 경험을 제공하고자 했습니다.",
        keyFeatures: [
          {
            title: "🏠 부동산 매물 검색",
            description: [
              "위치 및 조건 기반 아파트 검색",
              "카카오맵 연동으로 매물 위치 확인",
              "상세 매물 정보 및 거래 내역 제공"
            ]
          },
          {
            title: "👤 사용자 관리",
            description: [
              "소셜 로그인 (Google, Kakao, Naver)",
              "JWT 기반 인증 시스템",
              "사용자 프로필 관리"
            ]
          },
          {
            title: "💬 커뮤니티 기능",
            description: [
              "부동산 관련 게시글 및 댓글",
              "실시간 메시징 시스템",
              "관리자 공지사항 관리"
            ]
          },
          {
            title: "🤖 AI 챗봇",
            description: [
              "OpenAI ChatGPT API 연동",
              "자연어 부동산 상담 서비스",
              "맞춤형 투자 조언 제공"
            ]
          },
          {
            title: "❤️ 관심 매물",
            description: [
              "관심 지역 및 아파트 저장",
              "개인화된 매물 추천",
              "찜 목록 관리 기능"
            ]
          }
        ],
        objectives: [
          "복잡한 검색 조건의 동적 쿼리 최적화",
          "OAuth2.0 기반 소셜 로그인 시스템 구축",
          "AI 챗봇을 통한 자연어 부동산 상담",
          "비동기 처리로 사용자 경험 개선"
        ]
      },
      challenges: [
        {
          problem: "복잡한 검색 조건으로 인한 메서드 폭증과 유지보수성 저하",
          situation: "지역, 가격대, 매물타입 등 다양한 검색 조건 조합으로 인해 너무 많은 경우의 수가 발생. 각 경우마다 별도의 메서드를 만들어야 하는 문제로 코드 중복과 유지보수성 저하",
          solution: "QueryDSL을 활용한 동적 쿼리 생성 메서드로 통합 처리",
          implementation: [
            "BooleanExpression을 활용한 null-safe 조건부 쿼리 구성",
            "하나의 동적 쿼리 생성 메서드로 모든 검색 조건 처리",
            "조건별 메서드 분리로 코드 재사용성과 가독성 향상",
            "타입 안전한 쿼리 작성으로 런타임 오류 방지"
          ],
          result: "검색 관련 메서드 수 80% 감소, 유지보수 효율성 및 개발 속도 대폭 향상"
        },
        {
          problem: "이메일 전송 동기 처리로 인한 응답 지연 문제",
          situation: "회원가입 및 인증 과정에서 이메일 전송을 동기로 처리하여 사용자가 응답을 받기까지 10초 이상 소요되는 성능 문제 발생",
          solution: "Spring의 @Async 어노테이션을 활용한 비동기 이메일 전송 구현",
          implementation: [
            "@Async 어노테이션으로 이메일 전송 로직 비동기 처리",
            "ThreadPoolTaskExecutor 설정으로 스레드 풀 관리",
            "이메일 전송 실패 시 예외 처리 및 재시도 로직 구현",
            "사용자 응답과 이메일 전송 프로세스 분리"
          ],
          result: "사용자 응답 시간 70% 단축 (10초+ → 3초), 사용자 경험 대폭 개선"
        },
        {
          problem: "Spring AI 기반 부동산 상담 챗봇의 컨텍스트 관리",
          situation: "ChatGPT API 연동 시 프롬프트 템플릿 관리와 사용자별 대화 컨텍스트 유지가 필요한 상황",
          solution: "PromptTemplateLoader와 동적 프롬프트 관리 시스템 구축",
          implementation: [
            "프롬프트 유형별 템플릿 로딩 시스템 구현",
            "시스템 메시지와 사용자 입력을 조합한 컨텍스트 구성",
            "자유 대화와 구조화된 상담 모드 분리",
            "AI 응답 품질 개선을 위한 프롬프트 엔지니어링"
          ],
          result: "부동산 전문 상담 정확도 향상, 사용자 만족도 향상"
        }
      ],
      codeExamples: [
        {
          title: "QueryDSL 조건부 표현식과 동적 쿼리",
          language: "java",
          code: `@Repository
@RequiredArgsConstructor
public class HouseQueryRepository {
    
    private final JPAQueryFactory queryFactory;
    
    // Null-safe 조건부 표현식
    private BooleanExpression sidoEq(String sido) {
        return hasText(sido) ? house.region.sidoName.eq(sido) : null;
    }
    
    private BooleanExpression gugunEq(String gugun) {
        return hasText(gugun) ? house.region.gugunName.eq(gugun) : null;
    }
    
    private BooleanExpression houseTypeEq(String houseType) {
        return hasText(houseType) ? house.houseType.eq(houseType) : null;
    }
    
    // 사용자 인증 상태별 관심매물 포함 동적 쿼리
    public List<HouseAllQueryResponse> findAllWithLikeStatus(
            final Long memberId,
            final HouseSearchCondition condition,
            final Pageable pageable) {
        
        return queryFactory
                .select(Projections.constructor(HouseAllQueryResponse.class,
                        house.id,
                        house.houseName,
                        house.houseType,
                        house.region.sidoName,
                        house.region.gugunName,
                        house.region.dongName,
                        house.roadName,
                        house.roadNameBonbun,
                        house.roadNameBubun,
                        house.latitude,
                        house.longitude,
                        // 인증된 사용자일 경우 관심매물 여부 포함
                        memberId != null ? 
                            likeHouse.id.isNotNull().as("isLiked") : 
                            Expressions.FALSE.as("isLiked")
                ))
                .from(house)
                .leftJoin(house.region, region)
                // 동적 조인: 로그인 상태일 때만 관심매물 테이블 조인
                .leftJoin(memberId != null ? likeHouse : null)
                .on(memberId != null ? 
                    likeHouse.house.eq(house).and(likeHouse.member.id.eq(memberId)) : 
                    null)
                .where(
                    sidoEq(condition.getSido()),
                    gugunEq(condition.getGugun()),
                    houseTypeEq(condition.getHouseType()),
                    houseNameContains(condition.getHouseName())
                )
                .orderBy(house.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}`
        },
        {
          title: "비동기 Mail 전송",
          language: "java",
          code: `@RequiredArgsConstructor
@Service
public class MailService {

    private static final String VERIFICATION_CODE_SUBJECT = "SSAFY-HOME: 인증 코드 유효기간은 3분 입니다.";
    private static final String TEMPORARY_PASSWORD_SUBJECT = "SSAFY-HOME: 임시 비밀번호 입니다.";

    private final MailSendClient mailSendClient;

    @Async
    public void sendVerificationCode(final String to, final String code) {
        mailSendClient.sendMail(to, VERIFICATION_CODE_SUBJECT, code);
    }

    @Async
    public void sendTemporaryPassword(final String to, final String temporaryPassword) {
        mailSendClient.sendMail(to, TEMPORARY_PASSWORD_SUBJECT, temporaryPassword);
    }
}

// Async Configuration
@EnableAsync
@Configuration
public class AsyncConfig implements AsyncConfigurer {

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(10);
        taskExecutor.setMaxPoolSize(20);
        taskExecutor.setQueueCapacity(40);
        taskExecutor.setTaskDecorator(new MdcTaskDecorator());
        taskExecutor.setThreadNamePrefix("Async-");
        return taskExecutor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new AsyncExceptionHandler();
    }
}`
        },
        {
          title: "Spring AI를 활용한 챗봇 기능",
          language: "java",
          code: `@RequiredArgsConstructor
@RequestMapping("/chat")
@RestController
public class AiController {

    private final OpenAiChatModel chatModel;
    private final PromptTemplateLoader promptLoader;

    @PostMapping
    @UserAccess
    public ResponseEntity<PromptResponse> chat(
            @AuthenticationPrincipal AccessContext accessContext,
            @Valid@RequestBody final ChatRequest chatRequest) {
        return ResponseEntity.ok().body(PromptResponse.from(getResponse(DEFAULT, chatRequest.message())));
    }

    @PostMapping("/prompts")
    @UserAccess
    public ResponseEntity<PromptResponse> prompt(
            @AuthenticationPrincipal AccessContext accessContext,
            @RequestBody final PromptRequest promptRequest) {
        return ResponseEntity.ok().body(PromptResponse.from(getResponse(promptRequest.promptType(), null)));
    }

    private String getResponse(final PromptType promptType, final String message) {
        SystemMessage systemMessage = new SystemMessage(promptLoader.getSystemPromptResource(promptType));
        if(message == null){
            return chatModel.call(systemMessage);
        }
        UserMessage userMessage = new UserMessage(message);
        return chatModel.call(systemMessage, userMessage);
    }
}

// 프롬프트 템플릿 관리
@Component
@Slf4j
public class ChoicePromptTemplateLoader {

    @Value("classpath:prompts/prompt-choice-system.st")
    private Resource systemPromptResource;

    @Value("classpath:prompts/prompt-choice-user.st")
    private Resource userPromptResource;

    public String loadSystemPrompt() {
        try {
            return new String(FileCopyUtils.copyToByteArray(systemPromptResource.getInputStream()), StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("Error loading system prompt template", e);
            throw new RuntimeException("Failed to load system prompt template", e);
        }
    }

    public String loadUserPrompt() {
        try {
            return new String(FileCopyUtils.copyToByteArray(userPromptResource.getInputStream()), StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("Error loading user prompt template", e);
            throw new RuntimeException("Failed to load user prompt template", e);
        }
    }
}

@Component
@Slf4j
public class PromptTemplateLoader {

    @Value("classpath:prompts/system-trend.st")
    private Resource trendSystemPromptResource;

    @Value("classpath:prompts/system-information.st")
    private Resource informationSystemPromptResource;

    @Value("classpath:prompts/system-news.st")
    private Resource newsSystemPromptResource;

    @Value("classpath:prompts/system-standard.st")
    private Resource standardSystemPromptResource;

    @Value("classpath:prompts/system-advice.st")
    private Resource adviceSystemPromptResource;

    @Value("classpath:prompts/system-default.st")
    private Resource defaultSystemPromptResource;

    private Map<PromptType, Resource> systemPromptResources;


    @PostConstruct
    public void initPromptResources() {
        systemPromptResources = new EnumMap<>(PromptType.class);
        systemPromptResources.put(TREND, trendSystemPromptResource);
        systemPromptResources.put(INFORMATION, informationSystemPromptResource);
        systemPromptResources.put(NEWS, newsSystemPromptResource);
        systemPromptResources.put(STANDARD, standardSystemPromptResource);
        systemPromptResources.put(ADVICE, adviceSystemPromptResource);
        systemPromptResources.put(DEFAULT, defaultSystemPromptResource);
    }

    public String getSystemPromptResource(PromptType promptType) {
        try {
            return new String(FileCopyUtils.copyToByteArray(systemPromptResources.get(promptType).getInputStream()), StandardCharsets.UTF_8);
        } catch (IOException e){
            throw new RuntimeException("Failed to load system prompt template", e);
        }
    }
}`
        }
      ],
      techStack: {
        "Back-end": [
          { name: "Java", version: "21", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "Spring Boot", version: "3.3.5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
          { name: "Spring Data JPA", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
          { name: "QueryDSL", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "Spring Security", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
          { name: "Swagger", version: "", icon: "https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" }
        ],
        "Front-end": [
          { name: "Vue.js", version: "3.5.12", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
          { name: "HTML5", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS3", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "JavaScript", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
        ],
        "Database / Cache": [
          { name: "MySQL", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
          { name: "Redis", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
        ],
        "Infra": [
          { name: "AWS EC2", version: "", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
          { name: "Docker", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
        ]
      },
      achievements: [
        {
          metric: "유지보수 향상 및 개발 속도 향상",
          before: "5~6개 method",
          after: "1개 method",
          improvement: "80% 단축",
          description: "QueryDSL을 이용한 동적 쿼리 작성"
        },
        {
          metric: "응답 시간 향상",
          before: "10.x 초",
          after: "3.x 초",
          improvement: "70% 단축",
          description: "JavaMailSend에 Async 적용으로 응답 속도 향상"
        }
      ],
      lessons: [
        {
          category: "JPA와 QueryDsl",
          points: [
            "JPA를 활용한 Database와 Entity Mapping",
            "QueryDSL BooleanExpression을 통한 null-safe 조건부 쿼리 설계",
            "N+1 문제 해결을 위한 페치 조인과 projection 활용",
            "대용량 데이터 처리를 위한 커서 기반 페이지네이션 도입"
          ]
        },
        {
          category: "Spring AI",
          points: [
            "Prompt 파일을 활용한 System Prompt를 통해 응답 정확도 향상",
            "Spring AI framework로 ChatGPT API 효율적 연동"
          ]
        },
      ],
      images: {
        erd: [
          {
            src: "/images/projects/zipda/erd.png",
            alt: "데이터베이스 ERD",
          }
        ]
      }
    }
  };

  const project = projectsData[projectId as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            프로젝트를 찾을 수 없습니다
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "overview", name: "프로젝트 개요", icon: <Target className="w-4 h-4" /> },
    { id: "tech", name: "사용 기술", icon: <Settings className="w-4 h-4" /> },
    { id: "architecture", name: "아키텍처 & 설계", icon: <Server className="w-4 h-4" /> },
    { id: "challenges", name: "기술적 도전과 해결", icon: <Zap className="w-4 h-4" /> },
    { id: "code", name: "핵심 구현 코드", icon: <Code className="w-4 h-4" /> },
    { id: "achievements", name: "성과 및 배운 점", icon: <TrendingUp className="w-4 h-4" /> }
  ].filter(section => {
    // 프로젝트별로 섹션 필터링
    if (section.id === "architecture" && !(
      ('architecture' in project && project.architecture) || 
      ('images' in project && project.images && ('architecture' in project.images || 'erd' in project.images))
    )) {
      return false;
    }
    if (section.id === "challenges" && !('challenges' in project && project.challenges)) {
      return false;
    }
    if (section.id === "code" && !('codeExamples' in project && project.codeExamples)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>홈으로 돌아가기</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              {project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>라이브 데모</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  {project.thumbnail.startsWith('/') ? (
                    <img 
                      src={project.thumbnail} 
                      alt={`${project.title} 로고`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-4xl">{project.thumbnail}</div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{project.team}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">역할: {project.role}</span>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {activeSection === "overview" && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    📊 프로젝트 개요
                  </h2>
                  
                  <div className="space-y-8">
                    {/* 배경 및 동기 */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        배경 및 동기
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.overview.background}
                      </p>
                    </div>

                    {renderKeyFeatures(project.overview)}

                    {renderVideoPortfolio(project)}

                    {renderDemoVideo(project)}

                    {/* 화면 이미지 */}
                    {'images' in project && project.images && 'gallery' in project.images && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                          📸 화면 이미지
                        </h3>
                        <div className="space-y-6">
                          {project.images.gallery.map((image, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                                <p className="text-base text-gray-700 dark:text-gray-200 font-medium text-left">
                                  {image.title}
                                </p>
                              </div>
                              <div className="w-full">
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeSection === "architecture" && (
                ('architecture' in project && project.architecture) || 
                ('images' in project && project.images && ('architecture' in project.images || 'erd' in project.images))
              ) && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🏗️ 아키텍처 & 설계
                  </h2>
                  
                  <div className="space-y-8">
                    {/* 시스템 아키텍처 - 조건부 렌더링 */}
                    {'architecture' in project && project.architecture && project.architecture.systemDiagram && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          시스템 아키텍처
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 overflow-x-auto">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre">
                            {project.architecture.systemDiagram}
                          </pre>
                        </div>
                      </div>
                    )}
                    
                    {/* 주요 컴포넌트 - 조건부 렌더링 */}
                    {'architecture' in project && project.architecture && project.architecture.keyComponents && project.architecture.keyComponents.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          주요 컴포넌트
                        </h3>
                        <div className="grid gap-4">
                          {project.architecture.keyComponents.map((component, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {component.name}
                                </h4>
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                                  {component.tech}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300">
                                {component.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 데이터베이스 설계 - 조건부 렌더링 */}
                    {'architecture' in project && project.architecture && 'database' in project.architecture && project.architecture.database && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          데이터베이스 설계
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                            {project.architecture.database?.schema}
                          </pre>
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-gray-600 dark:text-gray-300">
                              <strong>설계 원칙:</strong> {project.architecture.database?.design}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ERD/아키텍처 다이어그램 - 조건부 렌더링 및 세로 정렬 */}
                    {'images' in project && project.images && ('erd' in project.images || 'architecture' in project.images) && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                          {('erd' in project.images && project.images.erd) ? 'ERD 다이어그램' : '아키텍처 다이어그램'}
                        </h3>
                        <div className="space-y-6">
                          {((('erd' in project.images && project.images.erd) ? 
                            project.images.erd : 
                            ('architecture' in project.images ? project.images.architecture : [])) as ImageItem[]
                          ).map((image: ImageItem, index: number) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                              {image.title && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                                  <p className="text-base text-gray-700 dark:text-gray-200 font-medium text-left">
                                    {image.title}
                                  </p>
                                </div>
                              )}
                              <div className="w-full">
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-auto object-contain"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeSection === "challenges" && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    ⚡ 기술적 도전과 해결
                  </h2>
                  
                  <div className="space-y-8">
                    {'challenges' in project && project.challenges.map((challenge, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {challenge.problem}
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                              <span className="font-medium text-red-900 dark:text-red-100">문제 상황</span>
                            </div>
                            <p className="text-red-700 dark:text-red-200">
                              {challenge.situation}
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <span className="font-medium text-blue-900 dark:text-blue-100">해결 방안</span>
                            </div>
                            <p className="text-blue-700 dark:text-blue-200 mb-3">
                              {challenge.solution}
                            </p>
                            <ul className="space-y-1">
                              {challenge.implementation.map((impl, implIndex) => (
                                <li key={implIndex} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-blue-700 dark:text-blue-200 text-sm">{impl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                              <span className="font-medium text-green-900 dark:text-green-100">성과</span>
                            </div>
                            <p className="text-green-700 dark:text-green-200 font-medium">
                              {challenge.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "tech" && 'techStack' in project && project.techStack && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🔧 사용 기술
                  </h2>
                  
                  <div className="space-y-6">
                    {Object.entries(project.techStack).map(([category, techs]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                          {category}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                          {techs.map((tech: TechItem, index: number) => (
                            <div key={index} className="text-center p-4">
                              <img 
                                src={tech.icon}
                                alt={tech.name}
                                className="w-16 h-16 mx-auto mb-3"
                              />
                              <div className="font-semibold text-gray-900 dark:text-white text-base">
                                {tech.name}
                              </div>
                              {tech.version && (
                                <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                  v{tech.version}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "code" && 'codeExamples' in project && project.codeExamples && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    💻 핵심 구현 코드
                  </h2>
                  
                  <div className="space-y-8">
                    {project.codeExamples.map((example, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {example.title}
                        </h3>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language={example.language}
                            style={oneDark}
                            customStyle={{
                              margin: 0,
                              padding: '1.5rem',
                              fontSize: '0.875rem',
                              lineHeight: '1.5',
                            }}
                            showLineNumbers={true}
                            wrapLines={true}
                            wrapLongLines={true}
                          >
                            {example.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "achievements" && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    📈 성과 및 배운 점
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        정량적 성과
                      </h3>
                      <div className="grid gap-4">
                        {project.achievements.map((achievement, index) => (
                          <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {achievement.metric}
                              </h4>
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                                {achievement.improvement}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-gray-500 dark:text-gray-400">
                                Before: {achievement.before}
                              </span>
                              <span className="text-blue-600 dark:text-blue-400">→</span>
                              <span className="text-green-600 dark:text-green-400 font-semibold">
                                After: {achievement.after}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {achievement.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {'lessons' in project && project.lessons && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          배운 점과 성장
                        </h3>
                        <div className="space-y-6">
                          {project.lessons.map((lesson, index) => (
                            <div key={index}>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                                {lesson.category}
                              </h4>
                              <ul className="space-y-2">
                                {lesson.points.map((point, pointIndex) => (
                                  <li key={pointIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {'improvements' in project && project.improvements && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          향후 개선 방향
                        </h3>
                        <ul className="space-y-2">
                          {project.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
