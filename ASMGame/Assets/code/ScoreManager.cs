using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreManager : MonoBehaviour
{
    [SerializeField] private Text scoreText;

    [SerializeField] private Text levelText;
    
    // khai báo các biến
    public static float score = 0f;

    private int maxlevel = 10;

    private int level = 1;

    private int scorcToNextLevel = 10;

    private bool isDead = false;

    internal void Dead()
    {
        isDead = true;
    }
    
    // tang điem
    public void tangDiem(float s)
    {
        score += s;
    }
    // tăng level
    void tangLevel()
    {
        if (level == maxlevel)
            return;
         scorcToNextLevel = scorcToNextLevel * 2;// 2 là 1 hệ só có thể thay
         level++;
         // thay toc độ
         GetComponent<Palyer>().setSpeed(level);


    }
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (!isDead)
        {
            if (score > scorcToNextLevel)
            {
                tangLevel();
            }
            // câp nhật điểm vào các Text
            scoreText.text = "Score: " + ((int)score).ToString();
            levelText.text = "Level: " + level;
        }
    }
}
