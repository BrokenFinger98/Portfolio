"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Github, 
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

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const [activeSection, setActiveSection] = useState("overview");

  // 프로젝트 데이터 (실제로는 API나 데이터베이스에서 가져올 수 있음)
  const projectsData = {
    aicheck: {
      title: "aicheck(아이췤)",
      subtitle: "AI를 활용한 금융 사기 예방 및 자녀의 건전한 금융 습관 형성 서비스",
      thumbnail: "🏦",
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
        projectType: "팀 프로젝트 (SSAFY 특화 프로젝트)"
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
      ]
    },
    ceonsun: {
      title: "개과천선(개발자 과외는 천선)",
      subtitle: "개발자와 수강생 간의 실시간 과외 매칭 플랫폼",
      thumbnail: "👨‍🏫",
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
        projectType: "팀 프로젝트 (SSAFY 공통 프로젝트)"
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
      ]
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
        projectType: "개인 오픈소스 프로젝트"
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
    zipda: {
      title: "ZIPDA(집다)",
      subtitle: "조건 기반 필터링을 지원하는 부동산 매물 검색 플랫폼",
      thumbnail: "🏠",
      duration: "2024.11.18 ~ 2024.11.27 (10일)",
      team: "백엔드 4명, 프론트 2명",
      role: "Back-End",
      github: "https://github.com/BrokenFinger98/ZIPDA",
      demo: "#",
      overview: {
        background: "기존 부동산 플랫폼들은 복잡한 검색 조건을 효율적으로 처리하지 못하고, 사용자 경험도 제한적이었습니다. AI 기술을 활용한 챗봇과 정교한 필터링 시스템을 통해 더 나은 부동산 검색 경험을 제공하고자 했습니다.",
        objectives: [
          "복잡한 검색 조건의 동적 쿼리 최적화",
          "OAuth2.0 기반 소셜 로그인 시스템 구축",
          "AI 챗봇을 통한 자연어 부동산 상담",
          "비동기 처리로 사용자 경험 개선"
        ],
        projectType: "팀 프로젝트 (해커톤)"
      },
      challenges: [
        {
          problem: "복잡한 매물 검색 조건의 동적 쿼리 처리",
          situation: "지역, 가격대, 평수, 교통접근성 등 다양한 조건을 조합한 검색에서 N+1 문제와 성능 저하 발생",
          solution: "QueryDSL BooleanBuilder와 페치 조인 최적화",
          implementation: [
            "BooleanBuilder를 통한 조건별 동적 쿼리 생성",
            "@EntityGraph로 N+1 문제 해결",
            "인덱스 최적화와 쿼리 힌트 적용"
          ],
          result: "검색 응답시간 70% 단축 (2.1초 → 0.6초)"
        }
      ],
      codeExamples: [
        {
          title: "QueryDSL 동적 검색 쿼리",
          language: "java",
          code: `@Repository
@RequiredArgsConstructor
public class PropertySearchRepository {
    
    private final JPAQueryFactory queryFactory;
    
    public Page<PropertyDto> searchProperties(PropertySearchCondition condition, Pageable pageable) {
        
        BooleanBuilder builder = new BooleanBuilder();
        
        // 동적 조건 추가
        if (condition.getRegion() != null) {
            builder.and(property.region.eq(condition.getRegion()));
        }
        
        if (condition.getMinPrice() != null) {
            builder.and(property.price.goe(condition.getMinPrice()));
        }
        
        if (condition.getMaxPrice() != null) {
            builder.and(property.price.loe(condition.getMaxPrice()));
        }
        
        if (condition.getRoomCount() != null) {
            builder.and(property.roomCount.eq(condition.getRoomCount()));
        }
        
        // 거리 기반 검색 (위도/경도 활용)
        if (condition.getLatitude() != null && condition.getLongitude() != null) {
            NumberExpression<Double> distance = Expressions.numberTemplate(Double.class,
                "ST_Distance_Sphere(POINT({0}, {1}), POINT(property.longitude, property.latitude))",
                condition.getLongitude(), condition.getLatitude());
            builder.and(distance.loe(condition.getMaxDistance()));
        }
        
        // 메인 쿼리 실행 (페치 조인으로 N+1 방지)
        List<PropertyDto> content = queryFactory
            .select(Projections.constructor(PropertyDto.class,
                property.id,
                property.title,
                property.price,
                property.region,
                property.roomCount,
                property.images.size().as("imageCount")
            ))
            .from(property)
            .leftJoin(property.images)
            .where(builder)
            .orderBy(property.createdAt.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();
        
        // 카운트 쿼리 (최적화)
        long total = queryFactory
            .select(property.count())
            .from(property)
            .where(builder)
            .fetchOne();
            
        return new PageImpl<>(content, pageable, total);
    }
}`
        }
      ],
      achievements: [
        {
          metric: "검색 성능",
          before: "2.1초",
          after: "0.6초",
          improvement: "70% 단축",
          description: "QueryDSL 동적 쿼리 최적화"
        }
      ],
      lessons: [
        {
          category: "쿼리 최적화",
          points: [
            "QueryDSL을 활용한 타입 안전한 동적 쿼리 작성",
            "복잡한 검색 조건 처리와 성능 최적화 경험",
            "Spring AI와 외부 API 연동 구현"
          ]
        }
      ]
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
    { id: "architecture", name: "아키텍처 & 설계", icon: <Server className="w-4 h-4" /> },
    { id: "challenges", name: "기술적 도전과 해결", icon: <Zap className="w-4 h-4" /> },
    { id: "tech", name: "사용 기술", icon: <Settings className="w-4 h-4" /> },
    { id: "code", name: "핵심 구현 코드", icon: <Code className="w-4 h-4" /> },
    { id: "achievements", name: "성과 및 배운 점", icon: <TrendingUp className="w-4 h-4" /> }
  ];

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
                <Github className="w-4 h-4" />
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
                <div className="text-4xl">{project.thumbnail}</div>
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
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        배경 및 동기
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.overview.background}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        프로젝트 목표
                      </h3>
                      <ul className="space-y-2">
                        {project.overview.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-300">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-blue-900 dark:text-blue-100">
                          프로젝트 유형
                        </span>
                      </div>
                      <p className="text-blue-700 dark:text-blue-200">
                        {project.overview.projectType}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === "architecture" && 'architecture' in project && project.architecture && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🏗️ 아키텍처 & 설계
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        시스템 아키텍처
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 overflow-x-auto">
                        <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre">
                          {'architecture' in project && project.architecture?.systemDiagram}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        주요 컴포넌트
                      </h3>
                      <div className="grid gap-4">
                        {'architecture' in project && project.architecture?.keyComponents?.map((component, index) => (
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

                    {'architecture' in project && project.architecture && 'database' in project.architecture && project.architecture.database && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          데이터베이스 설계
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                            {'architecture' in project && project.architecture && 'database' in project.architecture ? project.architecture.database?.schema : ''}
                          </pre>
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-gray-600 dark:text-gray-300">
                              <strong>설계 원칙:</strong> {'architecture' in project && project.architecture && 'database' in project.architecture ? project.architecture.database?.design : ''}
                            </p>
                          </div>
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
                    {project.challenges.map((challenge, index) => (
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

              {activeSection === "tech" && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🔧 사용 기술
                  </h2>
                  
                  <div className="space-y-6">
                    {Object.entries(project.techStack).map(([category, techs]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                          {category === 'backend' ? '백엔드' : 
                           category === 'infrastructure' ? '인프라' : 
                           category === 'messaging' ? '메시징' : category}
                        </h3>
                        <div className="grid gap-4">
                          {techs.map((tech, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {tech.name}
                                </h4>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                <span className="font-medium">선택 이유:</span> {tech.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "code" && project.codeExamples && (
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
                        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                          <pre className="text-sm text-gray-100">
                            <code>{example.code}</code>
                          </pre>
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
                    
                    {project.lessons && (
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
                    
                    {project.improvements && (
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