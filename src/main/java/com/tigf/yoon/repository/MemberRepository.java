package com.tigf.yoon.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.tigf.yoon.model.Member;

public interface MemberRepository extends CrudRepository<Member, String> {
	@Query("SELECT a FROM Member a WHERE a.id = :memberId")
	public Member findByMemberId(@Param(value = "memberId") String memberId);
}
