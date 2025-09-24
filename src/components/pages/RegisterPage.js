"use client";

import React, { useState } from "react";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import HorizontalRule from "../HorizontalRule";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.querySelector('button').disabled = true;
    e.target.querySelector('button').innerText = "회원가입 중...";

    const { name, email, password, passwordRepeat } = values;

    // TODO: 회원가입 처리
    // 1. fetch 를 사용하여 회원가입 요청을 보냅니다.
    const res = await fetch("https://learn.codeit.kr/api/link-service/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'email': email,
          'name': name,
          'password': password,
          'avatar': ""
        }),
    });

    // 5. 에러 상태를 만들고 회원가입 요청이 실패 시 에러 메시지를 회원가입버튼 바로 위에 표시합니다.
    if (!res.ok) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      e.target.querySelector('button').disabled = false;
      e.target.querySelector('button').innerText = "회원가입";
      return;
    }

    // 2. 성공 시 응답 데이터를 확인합니다.
    const data = await res.json();
    alert('회원가입 성공!');
    console.log(data);


    // 3. 로딩 상태를 만들고 로딩중일 때는 회원가입 버튼을 비활성화 합니다.
    e.target.querySelector('button').disabled = false;

    // 4. 추가로 로딩중일 때는 회원가입 버튼텍스트를 "회원가입 중..."으로 변경합니다.
    e.target.querySelector('button').innerText = "회원가입";

  }

  return (
    <>
      <h1 className={styles.Heading}>회원가입</h1>
      <Button
        className={styles.GoogleButton}
        type="button"
        appearance="outline"
        as="a"
        href="https://learn.codeit.kr/api/link-service/auth/google"
      >
        <img src="/images/google.svg" alt="Google" />
        구글로 시작하기
      </Button>
      <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="김링크"
          value={values.name}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="example@email.com"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.Input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        {error && <div>{error}</div>}
        <Button className={styles.Button} onSubmit={handleSubmit}>회원가입</Button>
        <div>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
