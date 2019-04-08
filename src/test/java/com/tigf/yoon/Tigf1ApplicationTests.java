package com.tigf.yoon;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.tigf.yoon.domain.MainController;

@RunWith(SpringRunner.class)
@WebMvcTest(MainController.class)
public class Tigf1ApplicationTests {

	@Autowired
	private MockMvc mvc;
	
	@Test
	public void givenRequestOnPublicPage_showReturn200() throws Exception {
		mvc.perform(get("/")).andExpect(status().isOk());
	}

	@Test
	public void givenRequestOnPrivatePageWithoutLogin_shouldReturn401() throws Exception {
		mvc.perform(get("/main")).andExpect(status().isUnauthorized());
	}
}
