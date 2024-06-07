export default function Logo() {
    return (
        <svg
            width="256"
            height="32"
            viewBox="0 0 256 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-red-900"
        >
            <path
                d="M0 16.631C0 14.5577 0.703153 12.9052 2.10967 11.6732C3.54425 10.4412 5.42881 9.82535 7.76359 9.82535H13.2909V7.70704C13.2909 6.74546 12.9956 5.99437 12.4049 5.45352C11.8141 4.8827 11.0125 4.59718 9.99983 4.59718C8.81842 4.59718 7.94649 4.94265 7.38384 5.6338C6.8212 6.32496 6.51192 7.1511 6.45559 8.11268H0.801673C0.858001 6.97082 1.11116 5.90423 1.56116 4.91268C2.03942 3.92113 2.68624 3.06479 3.50205 2.34366C4.31786 1.62254 5.28831 1.05172 6.41339 0.630987C7.53848 0.210255 8.80429 0 10.2108 0C11.561 0 12.7987 0.195381 13.9238 0.585916C15.0489 0.976451 16.0194 1.53239 16.8352 2.25352C17.651 2.97465 18.2839 3.86096 18.7339 4.91268C19.2121 5.9342 19.4512 7.09116 19.4512 8.3831V22.9859H13.9238L13.5019 19.831C13.1363 20.8827 12.3485 21.7539 11.1391 22.4451C9.92958 23.106 8.56526 23.4366 7.0463 23.4366C4.90857 23.4366 3.19256 22.8056 1.8987 21.5437C0.6329 20.2517 0 18.6141 0 16.631ZM6.32901 16.4507C6.32901 17.1718 6.55411 17.7577 7.0041 18.2084C7.4541 18.6592 8.11527 18.8845 8.98719 18.8845C10.3093 18.8845 11.35 18.4038 12.1095 17.4423C12.869 16.4507 13.2629 15.2338 13.2909 13.7916H9.15597C8.25577 13.7916 7.55262 14.0469 7.0463 14.5577C6.56804 15.0384 6.32901 15.6694 6.32901 16.4507ZM25.2998 32V0.450706H30.8271L31.2491 2.65916C32.1773 1.72778 33.176 1.05172 34.2448 0.630987C35.3138 0.210255 36.4249 0 37.5781 0C38.9565 0 40.2082 0.285523 41.3333 0.85634C42.4586 1.39719 43.429 2.17848 44.2446 3.2C45.0604 4.22152 45.6933 5.43842 46.1433 6.85071C46.5935 8.23279 46.8184 9.78028 46.8184 11.493C46.8184 13.1155 46.6075 14.6479 46.1855 16.0901C45.7919 17.5324 45.187 18.7944 44.3712 19.8761C43.5837 20.9577 42.6132 21.8292 41.4599 22.4901C40.3067 23.1211 38.9705 23.4366 37.4515 23.4366C36.214 23.4366 35.0747 23.2113 34.0338 22.7606C32.9931 22.2799 32.1351 21.5286 31.46 20.507V32H25.2998ZM35.6794 17.8028C37.1703 17.8028 38.3376 17.262 39.1814 16.1803C40.0536 15.0986 40.4894 13.6113 40.4894 11.7183C40.4894 9.82535 40.0675 8.33803 39.2236 7.25634C38.408 6.17465 37.2827 5.6338 35.8481 5.6338C34.3855 5.6338 33.2182 6.18975 32.3461 7.30141C31.4742 8.41307 31.0381 9.9155 31.0381 11.8085C31.0381 13.5511 31.432 14.9934 32.2195 16.1352C33.0073 17.2469 34.1604 17.8028 35.6794 17.8028ZM51.135 0.450706H57.2953V11.8535L65.4808 4.32676V0.450706H71.641V22.9859H65.4808V12.0789L59.6581 17.4423C58.7862 18.2535 58.1674 19.0497 57.8016 19.831C57.464 20.6123 57.2953 21.6638 57.2953 22.9859H51.135V0.450706ZM93.9143 0.450706V6.49014H87.5853V22.9859H81.425V6.49014H75.096V0.450706H93.9143ZM97.3665 22.9859V0.450706H107.577L109.856 8.29296C110.165 9.43482 110.418 10.6366 110.615 11.8986C110.84 13.1306 111.023 14.2574 111.164 15.2789H111.333C111.473 14.2574 111.642 13.1306 111.839 11.8986C112.036 10.6366 112.303 9.43482 112.641 8.29296L114.919 0.450706H125.13V22.9859H118.97V13.7465C118.97 12.4845 118.984 11.1475 119.012 9.73521C119.04 8.29296 119.124 6.94085 119.265 5.67887H119.012C118.759 6.94085 118.435 8.26299 118.041 9.64507C117.676 10.9972 117.296 12.2743 116.902 13.4761L114.581 20.9127H107.662L105.341 13.4761C104.947 12.2441 104.567 10.9521 104.202 9.6C103.836 8.21792 103.513 6.88068 103.231 5.58874H102.978C103.119 6.88068 103.203 8.24789 103.231 9.69014C103.259 11.1024 103.274 12.4545 103.274 13.7465V22.9859H97.3665ZM128.158 11.6732C128.158 9.90039 128.411 8.29296 128.917 6.85071C129.451 5.40845 130.197 4.19155 131.153 3.2C132.11 2.17848 133.249 1.39719 134.571 0.85634C135.893 0.285523 137.356 0 138.959 0C140.506 0 141.899 0.255324 143.136 0.766197C144.374 1.27707 145.429 1.9982 146.301 2.92958C147.201 3.86096 147.89 4.98772 148.368 6.30986C148.846 7.6018 149.086 9.05916 149.086 10.6817C149.086 11.4328 149.029 12.2141 148.917 13.0254H134.149C134.374 14.5577 134.909 15.7747 135.752 16.6761C136.624 17.5775 137.721 18.0282 139.043 18.0282C140.084 18.0282 140.97 17.7426 141.702 17.1718C142.433 16.601 142.883 15.8497 143.052 14.9183H149.212C149.071 16.1803 148.706 17.337 148.115 18.3887C147.552 19.4404 146.821 20.3419 145.921 21.093C145.021 21.8441 143.966 22.43 142.757 22.8507C141.575 23.2412 140.295 23.4366 138.917 23.4366C137.285 23.4366 135.809 23.1511 134.487 22.5803C133.164 22.0095 132.025 21.2131 131.069 20.1916C130.141 19.1398 129.423 17.893 128.917 16.4507C128.411 15.0085 128.158 13.4159 128.158 11.6732ZM134.529 8.51831H143.01C142.897 7.46659 142.475 6.61026 141.744 5.9493C141.041 5.28834 140.141 4.95775 139.043 4.95775C137.975 4.95775 137.046 5.27324 136.259 5.90423C135.499 6.53521 134.922 7.40665 134.529 8.51831ZM170.967 0.450706V6.49014H164.638V22.9859H158.477V6.49014H152.148V0.450706H170.967ZM174.419 0.450706H180.579V11.8535L188.765 4.32676V0.450706H194.925V22.9859H188.765V12.0789L182.942 17.4423C182.071 18.2535 181.451 19.0497 181.086 19.831C180.748 20.6123 180.579 21.6638 180.579 22.9859H174.419V0.450706ZM200.997 22.9859V0.450706H207.157V8.29296H208.465L214.161 0.450706H221.334V0.630987L213.992 10.4113L215.089 12.3493C215.397 12.8901 215.722 13.4461 216.06 14.0169C216.425 14.5577 216.819 15.0686 217.241 15.5493C217.691 16.03 218.182 16.4207 218.718 16.7211C219.252 17.0215 219.842 17.1718 220.49 17.1718C220.714 17.1718 220.996 17.1419 221.334 17.0817V23.1211C220.912 23.2412 220.49 23.3165 220.068 23.3465C219.674 23.4066 219.294 23.4366 218.929 23.4366C217.718 23.4366 216.65 23.1962 215.722 22.7155C214.821 22.2348 213.992 21.5887 213.233 20.7775C212.501 19.9662 211.84 19.0497 211.25 18.0282C210.659 16.9764 210.068 15.8948 209.478 14.7831L209.14 14.1521H207.157V22.9859H200.997ZM223.863 16.631C223.863 14.5577 224.568 12.9052 225.973 11.6732C227.408 10.4412 229.294 9.82535 231.627 9.82535H237.154V7.70704C237.154 6.74546 236.859 5.99437 236.268 5.45352C235.678 4.8827 234.876 4.59718 233.863 4.59718C232.682 4.59718 231.811 4.94265 231.247 5.6338C230.686 6.32496 230.376 7.1511 230.319 8.11268H224.665C224.722 6.97082 224.975 5.90423 225.425 4.91268C225.903 3.92113 226.551 3.06479 227.365 2.34366C228.182 1.62254 229.152 1.05172 230.277 0.630987C231.403 0.210255 232.669 0 234.074 0C235.424 0 236.663 0.195381 237.787 0.585916C238.914 0.976451 239.884 1.53239 240.699 2.25352C241.515 2.97465 242.148 3.86096 242.597 4.91268C243.076 5.9342 243.315 7.09116 243.315 8.3831V22.9859H237.787L237.365 19.831C237 20.8827 236.213 21.7539 235.002 22.4451C233.794 23.106 232.429 23.4366 230.91 23.4366C228.773 23.4366 227.057 22.8056 225.762 21.5437C224.496 20.2517 223.863 18.6141 223.863 16.631ZM230.192 16.4507C230.192 17.1718 230.418 17.7577 230.868 18.2084C231.319 18.6592 231.979 18.8845 232.851 18.8845C234.173 18.8845 235.213 18.4038 235.973 17.4423C236.732 16.4507 237.127 15.2338 237.154 13.7916H233.019C232.121 13.7916 231.416 14.0469 230.91 14.5577C230.433 15.0384 230.192 15.6694 230.192 16.4507ZM248.658 19.5155C248.658 18.2835 248.981 17.3221 249.629 16.631C250.274 15.9398 251.175 15.5944 252.329 15.5944C253.481 15.5944 254.382 15.9398 255.03 16.631C255.675 17.3221 256 18.2835 256 19.5155C256 20.7475 255.675 21.7088 255.03 22.4C254.382 23.0912 253.481 23.4366 252.329 23.4366C251.175 23.4366 250.274 23.0912 249.629 22.4C248.981 21.7088 248.658 20.7475 248.658 19.5155Z"
                fill="#171717"
            />
        </svg>
    )
}