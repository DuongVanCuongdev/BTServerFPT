using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PLayerHealth : MonoBehaviour
{
    [SerializeField] private float maxHealth = 100;
    [SerializeField] private float currentHealth = 100;
    private Animator anim;
    private float time;
    private AudioSource audioSource;
    public AudioClip deadSound;//khi chet phat ra am thanh
    public AudioClip hurtSound;//khi dau phat ra am thanh
    //dinh nghia delegate: thay doi phan tram suc khoe
    public event Action<float> OnHealthPecentChanged = delegate { };
    private void Awake()
    {
        anim = GetComponent<Animator>();//anh xa nhan vat
        audioSource = GetComponent<AudioSource>();//anh xa am thanh
    }
    public void ModifyHealth(int amount)//ham thay doi suc khoe
    {
        currentHealth += amount;
        float currentHealthPercent = currentHealth / maxHealth;
        if(currentHealth>10)//co the thay 10 bang so khac
        {
            SoundManager.Instance.PlaySound(hurtSound);
        }
        OnHealthPecentChanged(currentHealthPercent);//thay doi tren man hinh tich mau

    }
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (currentHealth <= 0)
        {
            audioSource.Pause();
            audioSource.clip = deadSound;
            audioSource.loop = false;
            
            
            audioSource.Play();
            audioSource.loop = false;
            
            //set trang thai chet
            anim.SetInteger("Death",1);
            GetComponent<Palyer>().death();//chet nv ko chay
            GetComponent<ScoreManager>().Dead();// chet ko cong diem
            time += Time.deltaTime;
        }

        if (time > 3f)
        {
            Application.LoadLevel("GameOverScene");
        }
    }
}
