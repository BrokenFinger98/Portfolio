import { Star } from "lucide-react";

export default function SkillsSection() {
  const renderStars = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= level
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const coreSkills = [
    {
      category: "Language",
      skills: [
        { name: "Java", level: 5, experience: "실무 프로젝트 다수 경험", color: "bg-orange-500" },
        { name: "Kotlin", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-purple-500" },
        { name: "C", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-blue-600" },
        { name: "JavaScript", level: 3, experience: "기본 사용법 숙지", color: "bg-yellow-500" },
      ]
    },
    {
      category: "Back-end (상급)",
      skills: [
        { name: "Spring Boot", level: 5, experience: "실무 프로젝트 다수 경험", color: "bg-green-500" },
        { name: "Spring Data JPA", level: 5, experience: "실무 프로젝트 다수 경험", color: "bg-green-600" },
      ]
    },
    {
      category: "Back-end (중급)",
      skills: [
        { name: "Spring Security", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-green-400" },
        { name: "Spring Cloud Gateway", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-green-300" },
        { name: "Spring Cloud Config", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-green-300" },
        { name: "Spring Cloud Eureka", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-green-300" },
        { name: "QueryDSL", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-indigo-500" },
        { name: "MyBatis", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-red-400" },
        { name: "OAuth2.0", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-blue-400" },
        { name: "Apache Kafka", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-gray-600" },
        { name: "JUnit5", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-orange-400" },
      ]
    },
    {
      category: "Database",
      skills: [
        { name: "MySQL", level: 5, experience: "실무 프로젝트 다수 경험", color: "bg-blue-500" },
        { name: "Redis", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-red-500" },
        { name: "MongoDB", level: 3, experience: "기본 사용법 숙지", color: "bg-green-600" },
      ]
    },
    {
      category: "Infrastructure",
      skills: [
        { name: "Docker", level: 5, experience: "실무 프로젝트 다수 경험", color: "bg-blue-600" },
        { name: "AWS EC2", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-orange-500" },
        { name: "AWS S3", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-orange-400" },
        { name: "Jenkins", level: 3, experience: "기본 사용법 숙지", color: "bg-blue-400" },
        { name: "AWS CloudFront", level: 3, experience: "기본 사용법 숙지", color: "bg-orange-300" },
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 5, experience: "실무 프로젝트 다수 경험", color: "bg-gray-700" },
        { name: "Jira", level: 4, experience: "심화 학습 및 프로젝트 적용", color: "bg-blue-600" },
        { name: "K6", level: 3, experience: "기본 사용법 숙지", color: "bg-purple-500" },
        { name: "Vue.js", level: 3, experience: "기본 사용법 숙지", color: "bg-green-500" },
        { name: "Swagger", level: 3, experience: "기본 사용법 숙지", color: "bg-green-400" },
      ]
    }
  ];

  const experienceLegend = [
    { level: 5, description: "실무 프로젝트 다수 경험", icon: "⭐⭐⭐⭐⭐" },
    { level: 4, description: "심화 학습 및 프로젝트 적용", icon: "⭐⭐⭐⭐" },
    { level: 3, description: "기본 사용법 숙지", icon: "⭐⭐⭐" },
  ];

  const allTechStack = [
    "Java", "Kotlin", "C", "JavaScript", "Spring Boot", "Spring Data JPA", 
    "Spring Security", "Spring Cloud Gateway", "Spring Cloud Config", "Spring Cloud Eureka", 
    "QueryDSL", "MyBatis", "OAuth2.0", "Apache Kafka", "JUnit5", "MySQL", 
    "Redis", "MongoDB", "Docker", "AWS EC2", "AWS S3", "Jenkins", 
    "AWS CloudFront", "Git", "Jira", "K6", "Vue.js", "Swagger"
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            기술 역량
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            백엔드 개발에 필요한 핵심 기술들과 숙련도를 확인해보세요.
          </p>
          
          {/* 경험도 범례 */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 inline-block">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">숙련도 기준</h3>
            <div className="space-y-2 text-left">
              {experienceLegend.map((legend, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm">{legend.icon}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{legend.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 핵심 기술 스택 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {coreSkills.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      {renderStars(skill.level)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.experience}
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 전체 기술 스택 태그 */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            사용 가능한 기술 스택
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {allTechStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}