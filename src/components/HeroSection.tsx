"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* 프로필 이미지 */}
          <div className="mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-2xl">
              <Image
                src="/images/profile/profileImage.jpg"
                alt="유선우 프로필 사진"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* 메인 타이틀 */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              <div className="block">백엔드 개발자</div>
              <div className="block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  유선우
                </span>
              </div>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              문제의 본질을 파악하고, 아키텍처와 코드로 구조화하는 데 강점을 가진 백엔드 개발자입니다.<br />
              <span className="whitespace-nowrap">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">응답 속도 최대 40% 개선</span>,{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">처리 성능 3.4배 향상</span> 등 수치 기반의 성능 개선 경험을 보유하고 있습니다.
              </span>
              기술 블로그 작성과 인터넷 강의 및 개발 서적을 통한 <span className="text-green-600 dark:text-blue-400 font-semibold">지속적인 학습과 지식 공유</span>를 실천하며, <br />
              <span className="text-sky-600 dark:text-indigo-400 font-semibold">기술적 실험과 개선을 통해 팀에 더 나은 방향을 제시하는 개발자</span>를 지향합니다.
            </p>
          </div>

          <div className="pt-8">
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto animate-bounce cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}