using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Palyer : MonoBehaviour
{
    private Vector3 moveVT;
    private bool isDead = false;
    private float gravity = 9.8f;
    private CharacterController player;
    [SerializeField]protected float speed = 5f;
    private float verticalVelocity = 0f;
    private float animTime = 3.5f;

    private void Awake()
    {
        player = GetComponent<CharacterController>();
        
    }

    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Time.time < animTime)
        {
            player.Move(Vector3.forward * speed * Time.deltaTime);
        }
        else
        {
            if (!isDead)// khi nv chưa chết
            {
                if (Input.GetKeyDown(KeyCode.UpArrow))
                {
                    moveVT.y -= speed;
                }

                if (player.isGrounded)
                {
                    verticalVelocity = -0.5f;
                }
                else
                {
                    verticalVelocity = verticalVelocity - (gravity * Time.deltaTime);
                }

                // di chuyeer theo tuwng chuc
                moveVT.x = Input.GetAxis("Horizontal") * 5;
                moveVT.y = verticalVelocity;
                moveVT.z = speed;
                player.Move(moveVT * Time.deltaTime);
            }
        }
    }

    public void setSpeed(float l)
    {
        speed += l;
    }
    // kiemr tra nv death
    internal void death()
    {
        isDead = true;
    }
}
